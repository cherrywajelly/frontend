'use client';

import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import Dropdown from '../dropdown';
import { TopBarProps } from './TopBar.types';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const variants = {
  base: 'text-body1',
  disabled: 'text-gray-20',
  active: 'text-secondary-main',
};

const TopBar = ({
  title = 'TimeToast',
  isBackBtn = true,
  isRight,
  submitAble = false,
  onBack,
  handleSubmit,
}: TopBarProps & { onBack?: () => void }) => {
  const [isActive, setIsActive] = useState<boolean>(submitAble ?? false);
  // console.log(isActive);
  const router = useRouter();

  const handleBackBtn = () => {
    router.back();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
  };

  const SettingCategories = [
    { label: '프로필 편집', onClick: () => router.push('/setting/profile') },
    { label: '그룹 관리', onClick: () => router.push('/setting/group') },
    { label: '아이콘 마켓', onClick: () => router.push('/') },
    { label: '구독 플랜', onClick: () => router.push('/') },
    { label: '로그아웃', onClick: () => handleLogout() },
  ];

  return (
    <div className="bg-white w-full h-[48px] border-b border-gray-10 px-6 flex justify-between items-center">
      {isBackBtn ? (
        <IoIosArrowBack
          onClick={onBack || handleBackBtn}
          size={20}
          className="text-black-main"
        />
      ) : (
        <></>
      )}

      <div className="flex-grow text-center text-body2 text-black-main">
        {title}
      </div>

      {isRight ? (
        isRight === 'setting' ? (
          <Dropdown items={SettingCategories} color="text-gray-80" />
        ) : (
          <span
            className={clsx(
              variants.base,
              isActive ? variants.active : variants.disabled,
            )}
            onClick={handleSubmit}
          >
            등록
          </span>
        )
      ) : (
        <div className="w-[20px]" />
      )}
    </div>
  );
};

export default TopBar;
