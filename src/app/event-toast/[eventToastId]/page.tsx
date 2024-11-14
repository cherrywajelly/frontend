'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import JamItem from '@/components/toast/JamItem';
import ToastBox from '@/components/toast/ToastBox';

import { useGetEventToastItem } from '@/hooks/api/useEventToast';

import lockedToast from '../../../../public/images/toast/lockedToast.png';

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

  const localStorageNickname =
    typeof window !== 'undefined' && localStorage.getItem('nickname');

  const isMine = localStorageNickname === data?.nickname;

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title={data?.title} />

      <div className="h-[calc(100vh-144px)] flex flex-grow flex-col bg-gray-05 p-6 overflow-y-auto">
        {data && (
          <>
            <ToastBox
              title={data.title}
              toastImg={data.iconImageUrl}
              profileImg={data?.memberProfileUrl}
              nickname={data.nickname}
              openDate={data.openedDate}
            >
              {data.isOpened ? (
                <Button
                  size="sm"
                  color={data.isOpened ? 'disabled' : 'primary'}
                  disabled={data.isOpened}
                  onClick={() => {
                    if (!data.isOpened)
                      router.push(`/event-toast/${data.eventToastId}/write`);
                  }}
                >
                  토스트가 오픈되었어요
                </Button>
              ) : isMine ? (
                <></>
              ) : (
                <Button
                  size="sm"
                  color={data.isOpened ? 'disabled' : 'primary'}
                  disabled={data.isOpened}
                  onClick={() => {
                    if (!data.isOpened)
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

            {data.dDay !== 0 ? (
              <div className="w-full h-full mt-4 flex flex-col justify-center items-center">
                <Image
                  src={lockedToast}
                  alt=""
                  className="opacity-50 w-[240px] h-[240px]"
                />
                <div>D-{data.dDay}</div>
              </div>
            ) : (
              <div className="w-full mt-4 grid grid-cols-3 gap-3">
                {data.jams &&
                  data.jams.map((item, index) => (
                    <JamItem
                      key={index}
                      nickname={item.nickname}
                      iconImageUrl={item.iconImageUrl}
                      onClick={() =>
                        router.push(
                          `/event-toast/${params.eventToastId}/jam/${item.jamId}`,
                        )
                      }
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
