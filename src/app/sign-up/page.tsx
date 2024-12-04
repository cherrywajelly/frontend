'use client';

import { ChangeEvent, useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

import { useNicknameSignUp, useNicknameValid } from '@/hooks/api/useSignUp';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [nickname, setNickname] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const [validMessage, setValidMessage] = useState<string>(
    '닉네임은 1자 이상 10자 이하의 영/문/숫자 조합으로 입력해주세요.',
  );

  const router = useRouter();

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsValid(false);
  };

  const {
    data: nicknameValidData,
    isLoading: isLoadingNicknameValid,
    refetch,
  } = useNicknameValid(nickname);

  const { mutate: mutateNicknameSignUp, isPending: isPendingSignUp } =
    useNicknameSignUp(nickname);

  const handleValidNickname = async () => {
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

    try {
      const data = await refetch();
      if (data.status === 'success') {
        setIsValid(true);
        setValidMessage('사용 가능한 닉네임입니다.');
      } else {
        setIsValid(false);
        setValidMessage(data.error?.message ?? '');
      }
    } catch (error) {
      // console.error('중복 확인 실패:', error);
    }
  };

  const handleSubmit = () => {
    mutateNicknameSignUp(undefined, {
      onSuccess: () => {
        // alert('회원가입 완료');
        router.push('/home');
      },
      onError: () => {
        // alert('예기치 못한 에러가 발생했습니다.');
      },
    });
  };

  return (
    <div className="w-full h-svh px-6 py-6 mt-0 bg-gray-05">
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

        <Button
          disabled={!isValid}
          color={isValid ? 'active' : 'disabled'}
          onClick={handleSubmit}
          className="mb-6"
        >
          회원가입하기
        </Button>
      </div>
    </div>
  );
}
