'use client';

import { useState } from 'react';

import { navItem } from '@/components/common-components/bottom-bar/BottomBar';
import Button from '@/components/common-components/button';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { usePostEventToast } from '@/hooks/api/useEventToast';
import useFormatDate from '@/hooks/useFormat';
import { notifyLater } from '@/utils/toast';

import { bottomBarItemState } from '@/atoms/componentAtom';
import { eventToastDataState, eventToastStepState } from '@/atoms/toastAtom';
import ToastDecoForm from '@/containers/write-toast/ToastDecoForm';
import EventToastNameForm from '@/containers/write-toast/event-toast/EventToastNameForm';
import EventToastOpenDateForm from '@/containers/write-toast/event-toast/EventToastOpenDateForm';

import { useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function EventToastPage() {
  const [step, setStep] = useRecoilState(eventToastStepState);
  const resetEventToastData = useResetRecoilState(eventToastDataState);
  const [eventToastData, setEventToastData] =
    useRecoilState(eventToastDataState);
  const router = useRouter();

  const [eventToastId, setEventToastId] = useState<number>();

  const [selectedItem, setSelectedItem] = useRecoilState(bottomBarItemState);

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
      resetEventToastData();
    }
  };

  const { mutate, isPending } = usePostEventToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const formatOpenDate = useFormatDate(eventToastData.openDate as Date);

  const handleSubmit = () => {
    const handleSuccess = () => {
      setIsDialogOpen(true);
      setStep(0);
      setSelectedItem(navItem[0]);
      resetEventToastData();
    };

    mutate(
      {
        iconId: eventToastData.iconId as number,
        openedDate: formatOpenDate,
        title: eventToastData.toastName as string,
      },
      {
        onSuccess: (data) => {
          setEventToastId(data.id);
          handleSuccess();
        },
        onError: (error) => {
          setStep(0);
          alert('예기치 못한 에러가 발생했습니다.');
        },
      },
    );
  };

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="이벤트 토스트 굽기" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {step === 0 && <EventToastOpenDateForm />}
            {step === 1 && <EventToastNameForm />}
            {step === 2 && (
              <ToastDecoForm
                stepState={eventToastStepState}
                dataState={eventToastDataState}
                handleSubmit={handleSubmit}
                type="toast"
                isPending={isPending}
              />
            )}
          </>
        )}
      </div>
      {isDialogOpen && (
        <ConfirmDialog
          description="이벤트 토스트가 생성되었어요!"
          isOpen={isDialogOpen}
          className="!max-w-[400px]"
          onClose={() => setIsDialogOpen((prev) => !prev)}
        >
          <Button
            color="active"
            className="w-full"
            onClick={() => {
              router.push(`/event-toast/${eventToastId}/share`);
            }}
          >
            공유하기
          </Button>
          <Button
            className="w-full text-white bg-gray-60"
            onClick={() => router.push('/home')}
          >
            홈으로 가기
          </Button>
        </ConfirmDialog>
      )}
    </div>
  );
}
