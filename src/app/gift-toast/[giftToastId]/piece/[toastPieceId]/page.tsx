'use client';

import { HiMiniUserGroup } from 'react-icons/hi2';

import BottomBar from '@/components/common-components/bottom-bar';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import PieceBox from '@/components/toast/PieceBox';

import {
  useDeleteToastPiece,
  useGetToastPieceItem,
} from '@/hooks/api/useGiftToast';
import { notifySuccess } from '@/utils/toast';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PageParams = {
  giftToastId: number;
  toastPieceId: number;
};

export default function GiftToastPiecePage({ params }: { params: PageParams }) {
  const { data, isLoading } = useGetToastPieceItem(params.toastPieceId);
  const router = useRouter();
  const { mutate, isPending } = useDeleteToastPiece();

  return (
    <div className="w-full h-lvh bg-gray-05">
      <TopBar title={data?.giftToastInfo.title} />

      <div className="h-[calc(100vh-144px)] flex flex-col gap-4 bg-gray-05 p-6 flex-grow overflow-y-auto">
        {isLoading || isPending ? (
          <Spinner />
        ) : (
          <>
            {/* 선물 토스트 요약 */}
            <div className="py-4 px-5 flex justify-between bg-white border border-gray-10 rounded-[10px]">
              <div className="flex gap-2 items-center">
                <Image
                  src={data?.giftToastInfo.iconImageUrl ?? ''}
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover w-[40px] h-[40px]"
                  priority
                />
                <span className="text-body1 text-gray-80 line-clamp-1">
                  {data?.giftToastInfo.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={data?.giftToastInfo.profileImageUrl ?? ''}
                  alt=""
                  width={24}
                  height={24}
                  className="object-cover w-[24px] h-[24px] rounded-full"
                  priority
                />
                <span className="text-gray-80 text-body4">
                  {data?.giftToastInfo.giftToastOwner}
                </span>
              </div>
            </div>

            {/* 토스트 조각 단일 조회 */}
            {data && (
              <PieceBox
                handleDelete={() => {
                  mutate(data.toastPieceResponse.toastPieceId, {
                    onSuccess: () => {
                      notifySuccess('토스트 조각이 삭제되었어요!');
                      router.back();
                    },
                    onError: (error) => {
                      alert('예기치 못한 에러가 발생헀습니다.');
                      console.error(error);
                    },
                  });
                }}
                data={data?.toastPieceResponse}
              />
            )}
          </>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
