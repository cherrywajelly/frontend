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

/**
 * TopBar 컴포넌트
 *
 * 이 컴포넌트는 화면 상단에 표시되는 바(bar)로, 제목과 왼쪽/오른쪽 버튼을 표시
 * 왼쪽 버튼(뒤로가기)은 기본적으로 제공되며, 오른쪽 버튼은 설정 메뉴 또는 등록 버튼을 설정할 수 있습니다.
 *
 * @param {string} title - 상단바에 표시될 제목 (기본값: 'TimeToast')
 * @param {boolean} isBackBtn - 뒤로가기 버튼 표시 여부 (기본값: true)
 * @param {string | boolean} [isRight] - 오른쪽 버튼 종류 (설정 메뉴 표시 시 'setting', 등록 버튼은 `true`로 설정)
 * @param {boolean} submitAble - 등록 버튼 활성화 여부
 * @param {function} [onBack] - 뒤로가기 버튼 클릭 시 실행될 함수
 * @param {function} [handleSubmit] - 등록 버튼 클릭 시 실행될 함수
 * @param {boolean} isPending - 등록 중 상태 여부 (등록 버튼 비활성화)
 * @returns {JSX.Element} - TopBar 컴포넌트를 반환
 */
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
    // { label: '구독 플랜', onClick: () => notifyLater() },
    { label: '구독 플랜', onClick: () => router.push('/setting/premiums') },
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
          data-testid="back-button"
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
