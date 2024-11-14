'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import PieceBox from '@/components/toast/PieceBox';
import ToastBox from '@/components/toast/ToastBox';

import { useGetGiftToastItem } from '@/hooks/api/useGiftToast';

import tempImg from '../../../../public/images/timetoast.png';
import lockedToast from '../../../../public/images/toast/lockedToast.png';

import clsx from 'clsx';
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
      <TopBar title={data?.giftToastInfo.title} />

      <div className="h-[calc(100vh-144px)] flex flex-grow flex-col gap-1 bg-gray-05 p-6 overflow-y-auto">
        {data && (
          <ToastBox
            title={data.giftToastInfo.title}
            toastImg={data.giftToastInfo.iconImageUrl ?? ''}
            profileImg={data.giftToastInfo.profileImageUrl}
            nickname={data.giftToastInfo.giftToastOwner}
            openDate={data.giftToastInfo.openedDate}
          >
            <Button
              size="sm"
              color={data.giftToastInfo.isOpened ? 'disabled' : 'primary'}
              disabled={data.giftToastInfo.isOpened}
              onClick={() => {
                if (!data.giftToastInfo.isOpened)
                  router.push(
                    `/gift-toast/${data.giftToastInfo.giftToastId}/write`,
                  );
              }}
            >
              {data.giftToastInfo.isOpened
                ? '토스트가 오픈되었어요'
                : '토스트 조각 쌓기'}
            </Button>
          </ToastBox>
        )}

        <div
          className={clsx(
            'mt-4 flex flex-col gap-4 justify-center items-center',
            data?.dDay !== 0 ? 'h-full' : '',
          )}
        >
          {data && data.toastPieceResponses.toastPieceResponses.length > 0 ? (
            data.toastPieceResponses.toastPieceResponses.map((item, idx) => {
              return (
                <PieceBox
                  key={item.toastPieceId}
                  handleDelete={() => {
                    console.log('hi');
                  }}
                  data={item}
                  onClick={() =>
                    router.push(
                      `/gift-toast/${data.giftToastInfo.giftToastId}/piece/${item.toastPieceId}`,
                    )
                  }
                  isList
                />
              );
            })
          ) : (
            <>
              <Image
                src={lockedToast}
                alt=""
                className="opacity-50 w-[240px] h-[240px]"
              />
              <div>D-{data?.dDay}</div>
            </>
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
