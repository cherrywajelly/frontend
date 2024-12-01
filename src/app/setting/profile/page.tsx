'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import { useMyInfo } from '@/hooks/api/useLogin';
import { useGetMyProfile } from '@/hooks/api/useMyPage';
import { usePostProfileImage } from '@/hooks/api/useSetting';
import { useNicknameSignUp, useNicknameValid } from '@/hooks/api/useSignUp';
import { notifyError, notifySuccess } from '@/utils/toast';

import { useQueryClient } from '@tanstack/react-query';

import temp from '../../../../public/images/default-toast.png';

import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

const SettingProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading, refetch: refetchMyInfo } = useMyInfo();
  const prevNickname = data && data.nickname;
  const prevProfileImg = data && data.profileUrl;

  const [nickname, setNickname] = useState<string>(data?.nickname ?? '');

  // 업로드할 파일
  const [profileImg, setProfileImg] = useState<File | null>(null);
  // preview image
  const [profileImgPreview, setProfileImgPreview] = useState<
    string | StaticImageData
  >(data?.profileUrl || temp);

  const profileImgPreviewItem = useMemo(() => {
    return profileImg
      ? URL.createObjectURL(profileImg)
      : data?.profileUrl || temp;
  }, [profileImg, data?.profileUrl]);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      refetchMyInfo();
    }
  }, [data, router, profileImgPreviewItem]);

  // nickname valid
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>(
    '닉네임은 1자 이상 10자 이하의 영/문/숫자 조합으로 입력해주세요.',
  );

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setProfileImg(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImgPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    data: nicknameValidData,
    isLoading: isLoadingNicknameValid,
    refetch,
  } = useNicknameValid(nickname);

  const { mutate: mutateNicknameSignUp, isPending: isPendingSignUp } =
    useNicknameSignUp(nickname);

  // image 등록
  const { mutate: mutateProfileImage, isPending: isPendingProfileImage } =
    usePostProfileImage();

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
      console.error('중복 확인 실패:', error);
    }
  };

  const handleSubmit = () => {
    if (nickname !== prevNickname) {
      mutateNicknameSignUp(undefined, {
        onSuccess: () => {
          notifySuccess('프로필 정보가 수정되었습니다.');
          setIsValid(false);
          sessionStorage.setItem('nickname', nickname ?? '');
        },
        onError: () => {
          notifyError('예기치 못한 에러가 발생했습니다.');
        },
      });
    }

    if (profileImg && profileImgPreview !== prevProfileImg) {
      mutateProfileImage(profileImg, {
        onSuccess: () => {
          // alert('프로필 정보가 수정되었습니다.');
          notifySuccess('프로필 정보가 수정되었어요!');
          queryClient.invalidateQueries({ queryKey: ['myProfile'] });
          queryClient.invalidateQueries({ queryKey: ['myInfo'] });
          // refetchMyInfo();
          // refetchMyProfile();
          router.replace('/mypage');
        },
        onError: () => {
          notifyError('예기치 못한 에러가 발생했습니다.');
        },
      });
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="프로필 편집" />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gray-05">
            <div className="flex flex-col items-center flex-none">
              <div className="relative" onClick={handleFileUploadClick}>
                <Image
                  src={profileImgPreviewItem}
                  alt=""
                  width={120}
                  height={120}
                  unoptimized
                  className="object-cover rounded-full w-[120px] h-[120px]"
                />
                <div className="absolute bottom-[-12px] right-0 border-4 border-gray-05 bg-gray-10 w-[40px] h-[40px] rounded-full flex justify-center items-center">
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
                <span
                  className={clsx(
                    'px-2 text-body5',
                    isValid ? 'text-success-main' : 'text-error-main',
                  )}
                >
                  {validMessage}
                </span>
              </div>
            </div>

            <Button
              size="md"
              // color={
              //   isValid || profileImg !== prevProfileImg ? 'active' : 'disabled'
              // }
              color="active"
              onClick={handleSubmit}
              // disabled={profileImg === prevProfileImg && !isValid}
              className="flex-none mb-4"
            >
              변경사항 저장
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingProfilePage;
