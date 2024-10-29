'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import GiftToastNameForm from '@/containers/write-toast/gift-toast/GiftToastNameForm';
import GiftToastOpenDateForm from '@/containers/write-toast/gift-toast/GiftToastOpenDateForm';

export default function GiftToastPage() {
  const [isRightBtn, setIsRightBtn] = useState<boolean>(false);

  // TODO: use recoil global state
  const [step, setStep] = useState<number>(0);

  return (
    <div className="w-full h-lvh">
      <TopBar title="선물 토스트 굽기" isRight={isRightBtn} />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1">
        {step === 0 && <GiftToastOpenDateForm />}
        {/* {step === 0 && <GiftToastNameForm />} */}
        {/* {step === 0 && <GiftT />} */}
      </div>
    </div>
  );
}
