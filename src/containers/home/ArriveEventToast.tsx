import { IoIosArrowForward } from 'react-icons/io';

import Button from '@/components/common-components/button';
import CustomSkeleton from '@/components/common-components/skeleton';

import ToastBox from '@/components/toast/ToastBox';

import { useGetFollowingUserEventToast } from '@/hooks/api/useEventToast';

import emptyImg from '../../../public/images/toast/emptyJam.png';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ArriveEventToast() {
  const { data, isLoading } = useGetFollowingUserEventToast();
  const router = useRouter();

  return (
    <div className="mt-6">
      <span className="text-gray-80 text-subtitle1">
        {isLoading ? (
          <CustomSkeleton height={32} containerClassName="w-full" />
        ) : (
          '친구의 토스트에 잼을 발라볼까요?'
        )}
      </span>
      <div className="mt-4 flex flex-col gap-4">
        {isLoading ? (
          <>
            <CustomSkeleton height={178} />
            <CustomSkeleton height={178} />
            <CustomSkeleton height={178} />
          </>
        ) : data && data.length > 0 ? (
          data.map((item) => {
            return (
              <ToastBox
                key={item.eventToastId}
                title={item.title}
                profileImg={item.memberProfileUrl}
                toastImg={item.icon.iconImageUrl}
                nickname={item.nickname}
                openDate={item.openedDate}
              >
                <Button
                  size="sm"
                  color="primary"
                  onClick={() =>
                    router.push(`/event-toast/${item.eventToastId}`)
                  }
                >
                  잼 바르기
                </Button>
              </ToastBox>
            );
          })
        ) : (
          <div
            className={clsx(
              'w-full border border-gray-10 bg-white px-4 py-5 flex justify-between gap-4 items-center rounded-[10px]',
            )}
            onClick={() => router.push('/search')}
          >
            <Image
              src={emptyImg}
              alt=""
              width={80}
              height={80}
              className="w-[80px] object-cover"
            />
            <span className="flex items-start gap-1 flex-1 flex-col">
              <span className="text-body1 text-gray-80">
                아직 친구가 없어요.
              </span>
              <span className="text-body4 text-gray-60">
                검색을 통해 친구를 팔로우하면
                <br />
                귀여운 토스트가 생겨요.
              </span>
            </span>

            <IoIosArrowForward size={30} className="text-gray-80" />
          </div>
        )}
      </div>
    </div>
  );
}
