'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import JamBox from '@/components/toast/JamBox';

import { useDeleteJamItem, useGetJamDetail } from '@/hooks/api/useEventToast';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PageParams = {
  eventToastId: number;
  jamId: number;
};

export default function JamItemPage({ params }: { params: PageParams }) {
  const { data, isLoading } = useGetJamDetail(params.jamId);
  console.log('data', data);

  const router = useRouter();
  const { mutate, isPending } = useDeleteJamItem();

  return (
    <div className="w-full h-lvh">
      <TopBar title={data?.eventToastDataResponse.eventToastTitle} />

      <div className="h-[calc(100vh-144px)] flex flex-col flex-grow gap-4 bg-gray-05 p-6 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {/* 선물 토스트 요약 */}
            <div className="py-4 px-5 flex justify-between bg-white border border-gray-10 rounded-[10px]">
              <div className="flex gap-2 items-center">
                <Image
                  src={
                    data?.eventToastDataResponse.eventToastIconImageUrl ?? ''
                  }
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover w-[40px] h-[40px]"
                  priority
                />
                <span className="text-body1 text-gray-80 line-clamp-1">
                  {data?.eventToastDataResponse.eventToastTitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={
                    data?.eventToastDataResponse.eventToastMemberProfile ?? ''
                  }
                  alt=""
                  width={24}
                  height={24}
                  className="object-cover w-[24px] h-[24px] rounded-full"
                  priority
                />
                <span className="text-gray-80 text-body4">
                  {data?.eventToastDataResponse.eventToastNickname}
                </span>
              </div>
            </div>

            {/* 잼 단일 조회 */}
            {data && (
              <JamBox
                handleDelete={() => {
                  mutate(params.jamId, {
                    onSuccess: () => {
                      alert('잼이 삭제되었어요!');
                      router.back();
                    },
                    onError: (error) => {
                      alert('예기치 못한 에러가 발생헀습니다.');
                      console.error(error);
                    },
                  });
                }}
                data={data.jamDataResponse}
              />
            )}
          </>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
