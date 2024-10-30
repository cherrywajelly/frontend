'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import { giftToastDataState, giftToastStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import WriteToastForm from '@/containers/write-toast/WriteToastForm';
import GiftToastNameForm from '@/containers/write-toast/gift-toast/GiftToastNameForm';
import GiftToastOpenDateForm from '@/containers/write-toast/gift-toast/GiftToastOpenDateForm';

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function GiftToastPage() {
  const [step, setStep] = useRecoilState(giftToastStepState);
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
        title="선물 토스트 굽기"
        isRight={step === 2 ? 'submit' : false}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && <GiftToastOpenDateForm />}
        {step === 1 && <GiftToastNameForm />}
        {step === 2 && (
          <ToastDecoForm
            stepState={giftToastStepState}
            dataState={giftToastDataState}
          />
        )}
        {/* {step === 3 && (
          <WriteToastForm
            stepState={giftToastStepState}
            dataState={giftToastDataState}
          />
        )} */}
      </div>
    </div>
  );
}
