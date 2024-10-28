'use client';

import { ChangeEvent, useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

export default function SignUpPage() {
  const [nickname, setNickname] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsValid(false);
  };

  const handleValidNickname = () => {
    // nicknameRegx: 1자 이상 10자 이하의 한글, 영문, 숫자 조합만 허용
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{1,10}$/;
    const isNicknameValid = nicknameRegex.test(nickname);
    // console.log(isNicknameValid);

    if (isNicknameValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
      // temporary alert
      alert(
        '닉네임은 1자 이상 10자 이하의 한글, 영문 또는 숫자 조합만 가능합니다.',
      );
    }
  };

  const handleSubmit = () => {
    // TODO: add sign-up logic by connecting API
  };

  return (
    <div className="w-full h-screen px-6 py-6 mt-6">
      <div className="flex flex-col h-full justify-between">
        <div>
          <InputForm
            title={
              <>
                반가워요 🙌🏻 <br />
                TimeToast에서 사용할 닉네임을 정해주세요 :{`)`}
              </>
            }
            subTitle="닉네임"
          >
            <div className="flex gap-2">
              <Input
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleNickname}
              />
              <Button
                color={nickname ? 'primary' : 'disabled'}
                onClick={handleValidNickname}
                size="lg"
              >
                중복확인
              </Button>
            </div>
          </InputForm>
        </div>

        <Button color={isValid ? 'active' : 'disabled'} onClick={handleSubmit}>
          회원가입하기
        </Button>
      </div>
    </div>
  );
}
