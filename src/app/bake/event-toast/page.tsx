'use client';

import { useState } from 'react';

import { navItem } from '@/components/common-components/bottom-bar/BottomBar';
import TopBar from '@/components/common-components/top-bar';

import { usePostEventToast } from '@/hooks/api/useEventToast';
import useFormatDate from '@/hooks/useFormat';

import { bottomBarItemState } from '@/atoms/componentAtom';
import { eventToastDataState, eventToastStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import EventToastNameForm from '@/containers/write-toast/event-toast/EventToastNameForm';
import EventToastOpenDateForm from '@/containers/write-toast/event-toast/EventToastOpenDateForm';

import { useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function EventToastPage() {
  const [step, setStep] = useRecoilState(eventToastStepState);
  const resetEventToastData = useResetRecoilState(eventToastDataState);
  const [eventToastData, setEventToastData] =
    useRecoilState(eventToastDataState);
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useRecoilState(bottomBarItemState);

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
      resetEventToastData();
    }
  };

  const { mutate, isPending } = usePostEventToast();

  const formatOpenDate = useFormatDate(eventToastData.openDate as Date);

  const handleSubmit = () => {
    const handleSuccess = () => {
      alert('토스트가 구워졌어요!');
      setSelectedItem(navItem[0]);
      router.replace('/');
    };

    console.log('eventToastData', eventToastData);
    mutate(
      {
        iconId: eventToastData.iconId as number,
        openedDate: formatOpenDate,
        title: eventToastData.toastName as string,
      },
      {
        onSuccess: handleSuccess,
      },
    );
  };

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="이벤트 토스트 굽기" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && <EventToastOpenDateForm />}
        {step === 1 && <EventToastNameForm />}
        {step === 2 && (
          <ToastDecoForm
            stepState={eventToastStepState}
            dataState={eventToastDataState}
            handleSubmit={handleSubmit}
            type="toast"
          />
        )}
      </div>
    </div>
  );
}
