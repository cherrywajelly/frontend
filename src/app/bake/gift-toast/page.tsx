'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import {
  usePostGiftToastFriend,
  usePostGiftToastGroup,
  usePostGiftToastMine,
} from '@/hooks/api/useGiftToast';

import { giftToastDataState, giftToastStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import GiftToastNameForm from '@/containers/write-toast/gift-toast/GiftToastNameForm';
import GiftToastOpenDateForm from '@/containers/write-toast/gift-toast/GiftToastOpenDateForm';
import GiftToastWithChoiceForm from '@/containers/write-toast/gift-toast/GiftToastWithChoiceForm';

import { useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function GiftToastPage() {
  const [step, setStep] = useRecoilState(giftToastStepState);
  const resetGiftToastData = useResetRecoilState(giftToastDataState);
  const [giftData, setGiftData] = useRecoilState(giftToastDataState);
  console.log(giftData);

  const router = useRouter();

  const [isSubmitAble, setIsSubmitAble] = useState<boolean>(false);

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
      resetGiftToastData();
    }
  };

  const { mutate: mutateGiftToastGroup } = usePostGiftToastGroup();
  const { mutate: mutateGiftToastFriend } = usePostGiftToastFriend();
  const { mutate: mutateGiftToastMine } = usePostGiftToastMine();

  const handleSubmit = () => {
    // mutateGiftToastGroup
  };

  return (
    <div className="w-full h-lvh">
      <TopBar
        onBack={handleBack}
        title="선물 토스트 굽기"
        isRight={step === 3 ? 'submit' : false}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && <GiftToastWithChoiceForm />}
        {step === 1 && <GiftToastOpenDateForm />}
        {step === 2 && <GiftToastNameForm />}
        {step === 3 && (
          <ToastDecoForm
            stepState={giftToastStepState}
            dataState={giftToastDataState}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
