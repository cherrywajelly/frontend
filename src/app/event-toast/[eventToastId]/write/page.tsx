'use client';

import { useEffect, useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import { usePostJamItemToEventToast } from '@/hooks/api/useEventToast';
import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import { jamDataState, jamStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import WriteToastForm from '@/containers/write-toast/WriteToastForm';

import { error } from 'console';
import { useParams, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function JamWritePage() {
  const [step, setStep] = useRecoilState(jamStepState);
  const [jamData, setJamData] = useRecoilState(jamDataState);
  const params = useParams();
  const eventToastId = Number(params.eventToastId);

  const router = useRouter();

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const convertContentsToFile = (contents: string, title: string) => {
    const blob = new Blob([contents], { type: 'text/html' });
    const fileName = `${title || 'jam_contents'}.html`;
    const file = new File([blob], fileName, { type: 'text/html' });

    return file;
  };

  const jamContentsFile = convertContentsToFile(
    jamData.contents as string,
    jamData.title as string,
  );

  const { mutate } = usePostJamItemToEventToast();

  const handleSubmit = () => {
    if (jamData.submitAble) {
      const jamRequest = {
        iconId: jamData.iconId as number,
        title: jamData.title ?? 'test',
      };

      mutate(
        {
          eventToastId: eventToastId,
          item: {
            jamContents: jamContentsFile,
            jamImages: jamData.imgList ?? [],
            jamRequest: jamRequest,
          },
        },
        {
          onSuccess: () => router.back(),
          onError: (error) => alert(error.message),
        },
      );
    }
  };

  useEffect(() => {
    console.log(jamData);
  }, [jamData]);

  return (
    <div className="w-full h-lvh">
      <TopBar
        onBack={handleBack}
        title="잼 바르기"
        isRight={step === 1 ? 'submit' : false}
        submitAble={jamData.submitAble}
        handleSubmit={handleSubmit}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && (
          <ToastDecoForm
            stepState={jamStepState}
            dataState={jamDataState}
            handleSubmit={handleNext}
            type="jam"
            isMainToast={false}
          />
        )}
        {step === 1 && (
          <WriteToastForm<pieceData | ToastData>
            stepState={jamStepState}
            dataState={jamDataState}
          />
        )}
      </div>
    </div>
  );
}
