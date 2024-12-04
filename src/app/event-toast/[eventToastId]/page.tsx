'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import JamItem from '@/components/toast/JamItem';
import ToastBox from '@/components/toast/ToastBox';

import { useGetEventToastItem } from '@/hooks/api/useEventToast';
import { notifyToast } from '@/utils/toast';

import lockedToast from '../../../../public/images/toast/lockedToast.png';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PageParams = {
  eventToastId: number;
};

export default function EventToastPage({ params }: { params: PageParams }) {
  const router = useRouter();
  const { data, isLoading } = useGetEventToastItem(params.eventToastId);

  const handleBack = () => {
    router.back();
  };

  const sessionStorageNickname =
    typeof window !== 'undefined' && sessionStorage.getItem('nickname');

  const isMine = sessionStorageNickname === data?.nickname;

  const handleShare = () => {
    router.push(`/event-toast/${data?.eventToastId}/share`);
  };

  return (
    <div className="w-full h-svh bg-gray-05">
      <TopBar onBack={handleBack} title={data?.title} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className={clsx(
            'p-6 flex flex-col justify-between',
            isMine ? 'h-[calc(100vh-72px)]' : 'h-[calc(100vh-144px)]',
          )}
        >
          <div className="flex justify-between flex-grow flex-col bg-gray-05 overflow-y-auto">
            {data && (
              <>
                <ToastBox
                  title={data.title}
                  toastImg={data.iconImageUrl}
                  profileImg={data?.memberProfileUrl}
                  nickname={data.nickname}
                  openDate={data.openedDate}
                  memberId={data.memberId}
                  dDay={data.dDay}
                >
                  {isMine ? (
                    data.isOpened ? (
                      <Button
                        size="sm"
                        color={data.isOpened ? 'disabled' : 'primary'}
                        disabled={data.isOpened}
                        onClick={() => {
                          if (!data.isOpened)
                            router.push(
                              `/event-toast/${data.eventToastId}/write`,
                            );
                        }}
                      >
                        토스트가 오픈되었어요
                      </Button>
                    ) : (
                      <></>
                    )
                  ) : data.isWritten ? (
                    <Button size="sm" color="disabled" disabled>
                      잼을 발랐어요
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => {
                        router.push(`/event-toast/${data.eventToastId}/write`);
                      }}
                    >
                      잼 바르기
                    </Button>
                  )}
                </ToastBox>

                <span className="mt-6 text-black-main text-subtitle3">
                  현재 {data.jamCount}명의 친구들이 잼을 발라줬어요.
                </span>

                {!data.isOpened ? (
                  <div className="w-full h-full mt-4 flex flex-col justify-center items-center">
                    <Image
                      src={lockedToast}
                      alt=""
                      className="opacity-50 w-[240px] h-[240px]"
                    />
                    <div className="text-gray-60">
                      {data.dDay <= 0 ? '' : `D-${data.dDay}`}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="w-full mt-4 grid grid-cols-3 gap-3">
                      {data.jams &&
                        data.jams.map((item, index) => (
                          <JamItem
                            key={index}
                            nickname={item.nickname}
                            iconImageUrl={item.iconImageUrl}
                            className={clsx(!isMine && 'opacity-60')}
                            onClick={() => {
                              if (isMine) {
                                router.push(
                                  `/event-toast/${params.eventToastId}/jam/${item.jamId}`,
                                );
                              } else {
                                notifyToast({
                                  text: '토스트 주인만 열어볼 수 있어요.',
                                  icon: '🥺',
                                });
                              }
                            }}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {isMine && (
            <Button
              color="active"
              onClick={handleShare}
              className="mt-6"
              size="md"
            >
              공유하기
            </Button>
          )}
        </div>
      )}
      {!isMine && <BottomBar />}
    </div>
  );
}
