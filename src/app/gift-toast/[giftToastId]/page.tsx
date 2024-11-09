'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import PieceBox from '@/components/toast/PieceBox';
import ToastBox from '@/components/toast/ToastBox';

import { useGetGiftToastItem } from '@/hooks/api/useGiftToast';

import tempImg from '../../../../public/images/timetoast.png';
import lockedToast from '../../../../public/images/toast/lockedToast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PageParams = {
  giftToastId: number;
};

export default function GiftToastItemPage({ params }: { params: PageParams }) {
  const { data, isLoading } = useGetGiftToastItem(params.giftToastId);
  const router = useRouter();

  return (
    <div className="w-full h-lvh">
      <TopBar title={data?.title} />

      {data && (
        <div className="h-[calc(100vh-144px)] flex flex-col gap-1 bg-gray-05 p-6">
          <ToastBox
            title={data.title}
            toastImg={data.iconImageUrl}
            profileImg={tempImg}
            nickname={data.giftToastOwner}
            openDate={data.openedDate}
          >
            <Button
              size="sm"
              color={data.isOpened ? 'disabled' : 'primary'}
              disabled={data.isOpened}
              onClick={() => {
                if (!data.isOpened)
                  router.push(`/gift-toast/${data.giftToastId}/write`);
              }}
            >
              {data.isOpened ? '토스트가 오픈되었어요' : '토스트 조각 쌓기'}
            </Button>
          </ToastBox>

          <div className="w-full h-full mt-4 flex flex-col gap-4 justify-center items-center border-2">
            {data.toastPieceResponses.toastPieceResponses.length > 0 ? (
              data.toastPieceResponses.toastPieceResponses.map((item, idx) => {
                return (
                  <PieceBox
                    key={idx}
                    handleDelete={() => {
                      console.log('hi');
                    }}
                    data={item}
                    onClick={() => router.push('/')}
                    isList
                  />
                );
              })
            ) : (
              <Image
                src={lockedToast}
                alt=""
                className="opacity-50 w-[240px] h-[240px]"
              />
            )}
            {/* TODO: api response에 맞게 넣기 */}
            <div>D-104</div>
          </div>
        </div>
      )}

      <div className="pt-[96px]" />
      <BottomBar />
    </div>
  );
}