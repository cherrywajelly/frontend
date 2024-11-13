'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import { jamDataState, jamStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import WriteToastForm from '@/containers/write-toast/WriteToastForm';

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function JamWritePage() {
  const [step, setStep] = useRecoilState(jamStepState);
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
        title="잼 바르기"
        isRight={step === 1 ? 'submit' : false}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && (
          <ToastDecoForm stepState={jamStepState} dataState={jamDataState} />
        )}
        {/* {step === 1 && (
          <WriteToastForm stepState={jamStepState} dataState={jamDataState} />
        )} */}
      </div>
    </div>
  );
}
