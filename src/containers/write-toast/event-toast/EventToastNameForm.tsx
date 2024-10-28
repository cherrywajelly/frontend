'use client';

import { ChangeEvent, useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

export default function EventToastNameForm() {
  const [toastName, setToastName] = useState<string>('');

  const handleToastName = (e: ChangeEvent<HTMLInputElement>) => {
    setToastName(e.target.value);
  };

  // TODO: to get global-state nickname by using recoil
  const nickname = '채민';

  const handleSubmit = () => {
    // TODO: ??
  };

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <div>
        <InputForm
          title={`${nickname}님의 이벤트토스트 이름을 지어주세요.`}
          subTitle="토스트명"
        >
          <Input
            placeholder="토스트 이름을 입력해주세요."
            value={toastName}
            onChange={handleToastName}
          />
        </InputForm>
      </div>

      <Button color={toastName ? 'active' : 'disabled'} onClick={handleSubmit}>
        다음
      </Button>
    </div>
  );
}
