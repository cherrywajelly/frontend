'use client';

import Button from '@/components/common-components/button';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import PieceBox from '@/components/toast/PieceBox';
import ToastBox from '@/components/toast/ToastBox';

import { useGetGiftToastItem } from '@/hooks/api/useGiftToast';

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
    <div className="w-full h-lvh bg-gray-05">
      <TopBar title={data?.giftToastInfo.title} />

      <div className="h-[calc(100vh-48px)] flex flex-grow flex-col gap-1 bg-gray-05 p-6 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data && (
              <ToastBox
                title={data.giftToastInfo.title}
                toastImg={data.giftToastInfo.iconImageUrl ?? ''}
                profileImg={data.giftToastInfo.profileImageUrl}
                nickname={data.giftToastInfo.giftToastOwner}
                openDate={data.giftToastInfo.openedDate}
                isLoading={isLoading}
                description={data.giftToastInfo.description}
                isCapsule
                whoInfo={data.giftToastTeamMember}
                giftToastType={data.giftToastInfo.giftToastType}
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
                'mt-4 flex flex-col gap-4 items-center',
                data?.dDay !== 0 ? 'h-full' : '',
              )}
            >
              {data &&
              data.toastPieceResponses.toastPieceResponses.length > 0 ? (
                data.toastPieceResponses.toastPieceResponses.map(
                  (item, idx) => {
                    return (
                      <PieceBox
                        key={item.toastPieceId}
                        handleDelete={() => {
                          // console.log('hi');
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
                  },
                )
              ) : !data?.giftToastInfo.isOpened ? (
                <div className="w-full h-full mt-4 flex flex-col justify-center items-center">
                  <Image
                    src={lockedToast}
                    alt=""
                    className="opacity-50 w-[240px] h-[240px]"
                  />
                  <div className="text-gray-60">
                    {data?.dDay === 0
                      ? '모두가 토스트 조각을 쌓아야 볼 수 있어요! '
                      : `D-${data?.dDay}`}
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
