'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import ToastBox from '@/components/toast/ToastBox';

import { useGetEventToastItem } from '@/hooks/api/useEventToast';

import lockedToast from '../../../../public/images/toast/lockedToast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PageParams = {
  eventToastId: number;
};

export default function JamPage({ params }: { params: PageParams }) {
  const router = useRouter();
  const { data, isLoading } = useGetEventToastItem(params.eventToastId);

  const handleBack = () => {
    router.back();
  };

  console.log(data);

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="잼 바르기" />

      <div className="h-[calc(100vh-144px)] flex flex-col gap-1 bg-gray-05">
        {data && (
          <>
            <ToastBox
              title="sss"
              toastImg={data.iconImageUrl}
              profileImg={data?.memberProfileUrl}
              nickname={data.nickname}
              openDate={data.openedDate}
            >
              <Button size="sm" color="primary">
                잼 바르기
              </Button>

              <Button
                size="sm"
                color={data.isOpened ? 'disabled' : 'primary'}
                disabled={data.isOpened}
                onClick={() => {
                  if (!data.isOpened)
                    router.push(`/event-toast/${data.eventToastId}/write`);
                }}
              >
                {data.isOpened ? '토스트가 오픈되었어요' : '잼 바르기'}
              </Button>
            </ToastBox>

            <div className="w-full h-full mt-4 flex flex-col justify-center items-center border-2">
              <span className="text-black-main text-subtitle3">
                현재 {data.jamCount}명의 친구들이 잼을 발라줬어요.
              </span>
              <Image
                src={lockedToast}
                alt=""
                className="opacity-50 w-[240px] h-[240px]"
              />
              {/* TODO: api response에 맞게 넣기 */}
              <div>D-{data.dDay}</div>
            </div>
          </>
        )}
      </div>

      <div className="pt-[96px]" />
      <BottomBar />
    </div>
  );
}
