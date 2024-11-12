'use client';

import { useEffect } from 'react';

import TopBar from '@/components/common-components/top-bar';

import { usePostToastPieces } from '@/hooks/api/useGiftToast';
import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import { toastPieceDataState, toastPieceStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import WriteToastForm from '@/containers/write-toast/WriteToastForm';

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function GiftWritePage() {
  const router = useRouter();

  const [step, setStep] = useRecoilState(toastPieceStepState);
  const [toastPieceData, setToastPieceData] =
    useRecoilState(toastPieceDataState);

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
    const fileName = `${title || 'toast_contents'}.html`;
    const file = new File([blob], fileName, { type: 'text/html' });

    return file;
  };

  const toastPieceContentsFile = convertContentsToFile(
    toastPieceData.contents as string,
    toastPieceData.title as string,
  );

  const { mutate } = usePostToastPieces();

  const handleSubmit = () => {
    if (toastPieceData.submitAble) {
      //
      const toastPieceRequest = {
        giftToastId: 7,
        iconId: 5,
        title: toastPieceData.title ?? 'testrequ',
      };

      mutate(
        {
          toastPieceContents: toastPieceContentsFile,
          toastPieceImages: toastPieceData.imgList ?? [],
          toastPieceRequest: toastPieceRequest,
        },
        {
          onSuccess: () => router.back(),
        },
      );
    }
  };

  useEffect(() => {
    console.log(toastPieceData);
  }, [toastPieceData]);

  return (
    <div className="w-full h-lvh">
      <TopBar
        title="토스트 조각 쌓기"
        onBack={handleBack}
        isRight={step === 1 ? 'submit' : false}
        submitAble={toastPieceData.submitAble}
        handleSubmit={handleSubmit}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && (
          <ToastDecoForm
            stepState={toastPieceStepState}
            dataState={toastPieceDataState}
            handleSubmit={handleNext}
            isMainToast={false}
          />
        )}
        {step === 1 && (
          <WriteToastForm<pieceData | ToastData>
            stepState={toastPieceStepState}
            dataState={toastPieceDataState}
          />
        )}
      </div>
    </div>
  );
}
