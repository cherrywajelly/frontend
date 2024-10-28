'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import EventToastNameForm from '@/containers/write-toast/event-toast/EventToastNameForm';
import EventToastOpenDateForm from '@/containers/write-toast/event-toast/EventToastOpenDateForm';

export default function EventToastPage() {
  const [isRightBtn, setIsRightBtn] = useState<boolean>(false);

  // TODO: use recoil global state
  const [step, setStep] = useState<number>(0);

  return (
    <>
      <TopBar title="이벤트 토스트 굽기" isRight={isRightBtn} />

      <div className="w-full h-screen flex flex-col gap-1">
        {step === 0 && <ToastDecoForm />}
        {/* {step === 0 && <EventToastOpenDateForm />} */}
        {step === 1 && <EventToastNameForm />}
        {step === 2 && <EventToastOpenDateForm />}
      </div>
    </>
  );
}
