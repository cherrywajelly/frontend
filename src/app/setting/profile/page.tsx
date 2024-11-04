'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import TopBar from '@/components/common-components/top-bar';

import { useNicknameSignUp, useNicknameValid } from '@/hooks/api/useSignUp';

import temp from '../../../../public/images/default-toast.png';

import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

export default function SettingProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const prevNickname = '기존닉네임';
  const prevProfileImg = temp;

  const [nickname, setNickname] = useState<string>(prevNickname);
  const [profileImg, setProfileImg] = useState<string | StaticImageData>(
    prevProfileImg,
  );

  // nickname valid
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>(
    '닉네임은 1자 이상 10자 이하의 영/문/숫자 조합으로? 입력해주세요.',
  );

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
        router.push('/');
      },
      onError: () => {
        alert('예기치 못한 에러가 발생했습니다.');
        router.push('/login');
      },
    });
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="프로필 편집" />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        <div className="w-full h-full p-6 flex flex-col justify-between bg-gray-05">
          <div className="flex flex-col items-center flex-none">
            <div className="relative">
              <Image
                src={profileImg || temp}
                alt=""
                width={120}
                height={120}
                className="object-cover rounded-full w-[120px] h-[120px]"
              />
              <div
                onClick={handleFileUploadClick}
                className="absolute bottom-[-12px] right-0 border-4 border-gray-05 bg-gray-10 w-[40px] h-[40px] rounded-full flex justify-center items-center"
              >
                <FiCamera size={20} />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div className="w-full mt-1">
              <span className="text-body1 text-black-main">닉네임</span>
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder=""
                  size="md"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <Button
                  color={nickname !== prevNickname ? 'primary' : 'disabled'}
                  onClick={handleValidNickname}
                  size="lg"
                >
                  중복확인
                </Button>
              </div>
            </div>
          </div>

          <Button
            size="md"
            color={
              profileImg !== prevProfileImg || isValid ? 'active' : 'disabled'
            }
            onClick={handleSubmit}
            disabled={profileImg === prevProfileImg && !isValid}
            className="flex-none mb-4"
          >
            변경사항 저장
          </Button>
        </div>
      </div>
    </div>
  );
}
