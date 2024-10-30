'use client';

import { ChangeEvent } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

import { eventToastDataState, eventToastStepState } from '@/atoms/toastAtom';

import { useRecoilState, useSetRecoilState } from 'recoil';

export default function EventToastNameForm() {
  const setStep = useSetRecoilState(eventToastStepState);
  const [eventData, setEventData] = useRecoilState(eventToastDataState);

  const handleSubmit = () => {
    setStep((prev) => prev + 1);
  };

  const handleToastName = (e: ChangeEvent<HTMLInputElement>) => {
    setEventData((prev) => ({ ...prev, toastName: e.target.value }));
  };

  // TODO: to get global-state nickname by using recoil
  const nickname = '채민';

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <div>
        <InputForm
          title={`${nickname}님의 이벤트토스트 이름을 지어주세요.`}
          subTitle="토스트명"
        >
          <Input
            placeholder="토스트 이름을 입력해주세요."
            value={eventData.toastName}
            onChange={handleToastName}
          />
        </InputForm>
      </div>

      <Button
        color={eventData.toastName ? 'active' : 'disabled'}
        onClick={handleSubmit}
      >
        다음
      </Button>
    </div>
  );
}
