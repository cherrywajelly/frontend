'use client';

import { useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { useMyInfo } from '@/hooks/api/useLogin';
import { useGetUserPremiumsAbout } from '@/hooks/api/usePremiums';
import { useDeleteWithdrawal } from '@/hooks/api/useSetting';

import Cookies from 'js-cookie';

export default function SettingAccountPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    Cookies.remove('accessToken');
    window.location.href = '/';
  };

  const { mutate: mutateWithdrawal, isPending: isPendingWithdrawal } =
    useDeleteWithdrawal();

  const handleWithdrawal = () => {
    mutateWithdrawal();
  };

  const { data } = useGetUserPremiumsAbout();

  const { data: myData, isLoading } = useMyInfo();

  return (
    <div className="w-full h-lvh bg-white">
      <TopBar title="계정 정보" />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="h-[calc(100vh-48px)] flex flex-grow flex-col bg-white overflow-y-auto">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center w-full gap-4">
              <span className="text-body4 text-gray-80 whitespace-nowrap">
                닉네임
              </span>
              <Input
                placeholder={myData?.nickname}
                disabled
                className="bg-gray-05"
              />
            </div>

            <div className="flex items-center w-full gap-4">
              <span className="text-body4 text-gray-80 whitespace-nowrap">
                이메일
              </span>
              <Input
                placeholder={myData?.email}
                disabled
                className="bg-gray-05"
              />
            </div>

            <div className="w-full flex flex-col">
              <div className="flex items-center w-full gap-4">
                <span className="text-body4 text-gray-80 whitespace-nowrap">
                  구독권
                </span>
                <Input
                  placeholder={data?.premiumType ?? ''}
                  disabled
                  className="bg-gray-05"
                />
              </div>
              {data?.premiumType === 'PREMIUM' && (
                <span className="p-2 text-navigation1 text-right text-gray-60">
                  만료일자: 24.12.25
                </span>
              )}
            </div>
          </div>

          {/* 로그아웃 및 회원 탈퇴 */}
          <div className="w-full flex items-center gap-6 justify-center text-body4">
            <button className="text-gray-80" onClick={handleLogout}>
              로그아웃
            </button>
            <span className="text-gray-20">|</span>
            <button
              className="text-error-main"
              onClick={() => setIsDialogOpen(true)}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      )}

      {isDialogOpen && (
        <ConfirmDialog
          description="정말로 회원탈퇴하시겠습니까?"
          className="!max-w-[400px]"
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen((prev) => !prev)}
        >
          <Button
            color="active"
            className="w-full"
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            취소
          </Button>
          <Button
            className="w-full text-white bg-gray-60"
            onClick={handleWithdrawal}
          >
            탈퇴하기
          </Button>
        </ConfirmDialog>
      )}
    </div>
  );
}
