'use client';

import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { useDeleteWithdrawal } from '@/hooks/api/useSetting';
import { notifyLater } from '@/utils/toast';

import Dropdown from '../dropdown';
import { TopBarProps } from './TopBar.types';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const variants = {
  base: 'text-body1',
  disabled: 'text-gray-20',
  active: 'text-secondary-main cursor-pointer',
};

const TopBar = ({
  title = 'TimeToast',
  isBackBtn = true,
  isRight,
  submitAble = false,
  onBack,
  handleSubmit,
  isPending,
}: TopBarProps & { onBack?: () => void }) => {
  const router = useRouter();

  const handleBackBtn = () => {
    router.back();
  };

  const SettingCategories = [
    { label: '계정 정보', onClick: () => router.push('/setting/account') },
    { label: '그룹 관리', onClick: () => router.push('/setting/group') },
    { label: '아이콘 마켓', onClick: () => router.push('/setting/market') },
    { label: '구독 플랜', onClick: () => notifyLater() },
    { label: '1:1 문의', onClick: () => router.push('/setting/inquiry') },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (handleSubmit) await handleSubmit();

    setIsSubmitting(false);
  };

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
          <button
            className={clsx(
              variants.base,
              isPending || !submitAble ? variants.disabled : variants.active,
            )}
            onClick={handleSubmitClick}
            disabled={isPending}
          >
            등록
          </button>
        )
      ) : (
        <div className="w-[20px]" />
      )}
    </div>
  );
};

export default TopBar;
