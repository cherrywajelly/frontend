'use client';

import { useState } from 'react';

import { navItem } from '@/components/common-components/bottom-bar/BottomBar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import {
  usePostGiftToastFriend,
  usePostGiftToastGroup,
  usePostGiftToastMine,
} from '@/hooks/api/useGiftToast';
import useFormatDate from '@/hooks/useFormat';

import { bottomBarItemState } from '@/atoms/componentAtom';
import { giftToastDataState, giftToastStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import GiftToastNameForm from '@/containers/write-toast/gift-toast/GiftToastNameForm';
import GiftToastOpenDateForm from '@/containers/write-toast/gift-toast/GiftToastOpenDateForm';
import GiftToastWithChoiceForm from '@/containers/write-toast/gift-toast/GiftToastWithChoiceForm';

import { useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function GiftToastPage() {
  const [step, setStep] = useRecoilState(giftToastStepState);
  const resetGiftToastData = useResetRecoilState(giftToastDataState);
  const [giftData, setGiftData] = useRecoilState(giftToastDataState);

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useRecoilState(bottomBarItemState);

  const [isSubmitAble, setIsSubmitAble] = useState<boolean>(false);

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
      resetGiftToastData();
    }
  };

  const { mutate: mutateGiftToastGroup, isPending: isPendingGroup } =
    usePostGiftToastGroup();
  const { mutate: mutateGiftToastFriend, isPending: isPendingFriend } =
    usePostGiftToastFriend();
  const { mutate: mutateGiftToastMine, isPending: isPendingMine } =
    usePostGiftToastMine();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [responseGiftToastId, setResponseGiftToastId] = useState<number>();

  const formatMemoryDate = useFormatDate(giftData.memoryDate as Date);
  const formatOpenDate = useFormatDate(giftData.openDate as Date);

  const handleSubmit = () => {
    const handleSuccess = (data: any) => {
      setResponseGiftToastId(data.giftToastId);
      setIsDialogOpen(true);
      setStep(0);
      setSelectedItem(navItem[0]);
      resetGiftToastData();
    };

    if (giftData.type === 'group') {
      mutateGiftToastGroup(
        {
          iconId: giftData.iconId as number,
          teamId: giftData.id as number,
          memorizedDate: formatMemoryDate,
          openedDate: formatOpenDate,
          title: giftData.toastName as string,
        },
        {
          onSuccess: handleSuccess,
          onError: (error) => {
            setStep(0);
            alert('예기치 못한 에러가 발생했습니다.');
            resetGiftToastData();
          },
        },
      );
    } else if (giftData.type === 'friend') {
      mutateGiftToastFriend(
        {
          iconId: giftData.iconId as number,
          friendId: giftData.id as number,
          memorizedDate: formatMemoryDate,
          openedDate: formatOpenDate,
          title: giftData.toastName as string,
        },
        {
          onSuccess: handleSuccess,
          onError: (error) => {
            setStep(0);
            alert('예기치 못한 에러가 발생했습니다.');
            resetGiftToastData();
          },
        },
      );
    } else if (giftData.type === 'mine') {
      mutateGiftToastMine(
        {
          iconId: giftData.iconId as number,
          memorizedDate: formatMemoryDate,
          openedDate: formatOpenDate,
          title: giftData.toastName as string,
        },
        {
          onSuccess: handleSuccess,
          onError: (error) => {
            setStep(0);
            alert('예기치 못한 에러가 발생했습니다.');
            resetGiftToastData();
          },
        },
      );
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="캡슐 토스트 굽기" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && <GiftToastWithChoiceForm />}
        {step === 1 && <GiftToastOpenDateForm />}
        {step === 2 && <GiftToastNameForm />}
        {step === 3 && (
          <ToastDecoForm
            stepState={giftToastStepState}
            dataState={giftToastDataState}
            handleSubmit={handleSubmit}
            type="toast"
          />
        )}
      </div>
      {isDialogOpen && (
        <ConfirmDialog
          description="캡슐 토스트가 생성되었어요!"
          className="!max-w-[400px]"
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen((prev) => !prev)}
        >
          <Button
            color="active"
            className="w-full"
            onClick={() => {
              router.replace(`/gift-toast/${responseGiftToastId}`);
            }}
          >
            토스트 조각 쌓기
          </Button>
          <Button
            className="w-full text-white bg-gray-60"
            onClick={() => router.replace('/home')}
          >
            홈으로 가기
          </Button>
        </ConfirmDialog>
      )}
    </div>
  );
}
