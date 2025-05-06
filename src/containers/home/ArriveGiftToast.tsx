import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import Button from '@/components/common-components/button';
import CustomSkeleton from '@/components/common-components/skeleton';

import { useGetToastIncompleted } from '@/hooks/api/useGiftToast';
import { useMyInfo } from '@/hooks/api/useLogin';

import { memberIdState } from '@/atoms/userInfoAtom';

import emptyImg from '../../../public/images/toast/emptyToast.png';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function ArriveGiftToast() {
  const router = useRouter();
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const { data: myInfoData, isLoading: isLoadingNickname } = useMyInfo();
  const { data: incompletedToastData, isLoading: isLoadingToastData } =
    useGetToastIncompleted();

  const handleClick = (id: number) => {
    router.push(`/gift-toast/${id}`);
  };

  useEffect(() => {
    if (myInfoData) {
      setMemberId(myInfoData.memberId);
      if (typeof window !== 'undefined')
        sessionStorage.setItem('nickname', myInfoData?.nickname ?? '');
    }
  }, [myInfoData]);

  return (
    <div role="status">
      <span className="text-gray-80 text-subtitle1">
        {isLoadingToastData ? (
          <CustomSkeleton height={32} containerClassName="w-full" />
        ) : (
          <>
            반가워요 🙌🏻
            <br />
          </>
        )}
        <span className="flex">
          {isLoadingToastData ? (
            <CustomSkeleton height={32} containerClassName="w-full" />
          ) : incompletedToastData && incompletedToastData?.length > 0 ? (
            <span>{myInfoData?.nickname}님에게 도착한 토스트예요!</span>
          ) : (
            <span>{myInfoData?.nickname}님에게 도착한 토스트가 없어요!</span>
          )}
        </span>
      </span>

      <div className="mt-4 flex overflow-x-auto whitespace-nowrap hide-scrollbar">
        {isLoadingToastData ? (
          <>
            <Skeleton width={140} height={174} className="mr-2" />
            <Skeleton width={140} height={174} className="mr-2" />
            <Skeleton width={140} height={174} />
          </>
        ) : incompletedToastData && incompletedToastData.length > 0 ? (
          incompletedToastData.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleClick(item.giftToastId)}
                className={clsx(
                  `${idx !== incompletedToastData.length - 1 ? 'mr-2' : ''}`,
                  'w-[140px] bg-white px-4 py-5 flex flex-col justify-center items-center border border-gray-10 rounded-[10px]',
                )}
              >
                <Image
                  src={item.iconImageUrl}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] object-cover"
                />
                <span className="mt-2 w-[108px] text-gray-80 text-body1 truncate text-center">
                  {item.title}
                </span>
              </div>
            );
          })
        ) : (
          <div
            className={clsx(
              'w-full text-center bg-white px-4 py-5 flex flex-col justify-between gap-4 items-center rounded-[10px]',
            )}
          >
            {/* <Image
              src={emptyImg}
              alt=""
              width={250}
              height={200}
              className="w-[250px] object-cover"
            />
            <Button
              color="primary"
              size="sm"
              className="w-full"
              onClick={() => router.push('/bake/gift-toast')}
            >
              선물 토스트 굽기
            </Button> */}

            <Image
              src={emptyImg}
              alt=""
              width={120}
              height={120}
              className="w-[120px] object-cover"
            />

            <span className="flex flex-1 items-center text-body4 text-gray-80">
              친구들과 즐거운 추억을 공유할 수 있어요.
            </span>

            <Button
              color="primary"
              size="sm"
              className="w-full h-[48px]"
              onClick={() => router.push('/bake/gift-toast')}
            >
              캡슐 토스트 굽기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
