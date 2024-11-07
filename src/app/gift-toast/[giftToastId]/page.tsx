'use client';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import PieceBox from '@/components/toast/PieceBox';
import ToastBox from '@/components/toast/ToastBox';

import { useGetGiftToastItem } from '@/hooks/api/useGiftToast';

import tempImg from '../../../../public/images/timetoast.png';

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
        <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05 p-6">
          <ToastBox
            title={data.title}
            toastImg={data.iconImageUrl}
            profileImg={tempImg}
            nickname={data.giftToastOwner}
            openDate={data.openedDate}
          >
            <Button size="sm" color="primary">
              토스트 조각 쌓기
            </Button>
          </ToastBox>

          <div className="mt-4 flex flex-col gap-4">
            {data.toastPieceResponses.toastPieceResponses.map((item, idx) => {
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}
