'use client';

import { ChangeEvent, useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

import { useNicknameSignUp, useNicknameValid } from '@/hooks/api/useSignUp';

import clsx from 'clsx';

export default function SignUpPage() {
  const [nickname, setNickname] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const [validMessage, setValidMessage] = useState<string>(
    '닉네임은 1자 이상 10자 이하의 영/문/숫자 조합으로? 입력해주세요.',
  );

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsValid(false);
  };

  const { mutate: mutateNicknameValid, isPending: isPendingValid } =
    useNicknameValid(nickname);
  const { mutate: mutateNicknameSignUp, isPending: isPendingSignUp } =
    useNicknameSignUp(nickname);

  const handleValidNickname = () => {
    // nicknameRegx: 1자 이상 10자 이하의 한글, 영문, 숫자 조합만 허용
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{1,10}$/;
    const isNicknameValid = nicknameRegex.test(nickname);
    // console.log(isNicknameValid);

    if (!isNicknameValid) {
      setIsValid(false);
      setValidMessage(
        '닉네임은 1자 이상 10자 이하의 한글, 영문 또는 숫자 조합만 가능합니다.',
      );
      return;
    }

    mutateNicknameValid(undefined, {
      onSuccess: () => {
        setIsValid(true);
        setValidMessage('사용 가능한 닉네임입니다.');
      },
      onError: () => {
        setIsValid(false);
        setValidMessage('이미 사용 중인 닉네임입니다.');
      },
    });
  };

  const handleSubmit = () => {
    mutateNicknameSignUp(undefined, {
      onSuccess: () => {
        // alert('회원가입 완료');
      },
      onError: () => {},
    });
  };

  return (
    <div className="w-full h-lvh px-6 py-6 mt-0 bg-gray-05">
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
            <span
              className={clsx(
                'px-2 text-body5',
                isValid ? 'text-success-main' : 'text-error-main',
              )}
            >
              {validMessage}
            </span>
          </InputForm>
        </div>

        <Button color={isValid ? 'active' : 'disabled'} onClick={handleSubmit}>
          회원가입하기
        </Button>
      </div>
    </div>
  );
}
