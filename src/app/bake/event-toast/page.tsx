'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import { eventToastDataState, eventToastStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import WriteToastForm from '@/containers/write-toast/WriteToastForm';
import EventToastNameForm from '@/containers/write-toast/event-toast/EventToastNameForm';
import EventToastOpenDateForm from '@/containers/write-toast/event-toast/EventToastOpenDateForm';

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function EventToastPage() {
  const [step, setStep] = useRecoilState(eventToastStepState);
  const router = useRouter();

  const [isSubmitAble, setIsSubmitAble] = useState<boolean>(false);

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar
        onBack={handleBack}
        title="이벤트 토스트 굽기"
        isRight={step === 2 ? 'submit' : false}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && <EventToastOpenDateForm />}
        {step === 1 && <EventToastNameForm />}
        {step === 2 && (
          <ToastDecoForm
            stepState={eventToastStepState}
            dataState={eventToastDataState}
          />
        )}
      </div>
    </div>
  );
}
