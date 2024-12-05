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

  const handleToastDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEventData((prev) => ({ ...prev, toastDescription: e.target.value }));
  };

  const nickname =
    typeof window !== 'undefined' && sessionStorage.getItem('nickname');

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
            maxLength={20}
          />
          <span className="pt-2 px-2 text-body5 text-gray-80">
            토스트 이름은 최대 20자까지 가능합니다.
          </span>
        </InputForm>
      </div>

      <div>
        <InputForm
          title={`토스트에 대한 한줄 소개를 적어주세요. (선택)`}
          subTitle="토스트 한줄 소개"
        >
          <textarea
            placeholder="한줄 소개를 입력해주세요."
            value={eventData.toastDescription}
            onChange={handleToastDescription}
            maxLength={150}
            className="resize-none border border-gray-10 placeholder:text-gray-60 rounded-[10px] text-body2 text-gray-80 w-full h-[140px] p-4 focus:outline-primary-main"
          />
          <span className="pt-2 px-2 text-right text-body5 text-gray-80">
            ({eventData.toastDescription?.length} / 150)
          </span>
        </InputForm>
      </div>

      <Button
        color={eventData.toastName ? 'active' : 'disabled'}
        onClick={handleSubmit}
        disabled={!eventData.toastName}
        className="mb-6"
      >
        다음
      </Button>
    </div>
  );
}
