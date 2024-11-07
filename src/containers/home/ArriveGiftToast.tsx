import { useGetToastIncompleted } from '@/hooks/api/useGiftToast';
import { useMyInfo } from '@/hooks/api/useLogin';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ArriveGiftToast() {
  const router = useRouter();

  const { data: myInfoData, isLoading } = useMyInfo();
  const { data: incompletedToastData, isLoading: isLoadingToastData } =
    useGetToastIncompleted();

  const handleClick = (id: number) => {
    router.push(`/gift-toast/${id}`);
  };

  return (
    <div>
      <span className="text-gray-80 text-subtitle1">
        반가워요 🙌🏻
        <br />
        {myInfoData?.nickname}님에게 도착한 토스트예요!
      </span>

      <div className="mt-4 flex overflow-x-auto whitespace-nowrap hide-scrollbar">
        {incompletedToastData ? (
          incompletedToastData.map((item, idx: number) => {
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
          // TODO: isLoading이랑 아예 데이터 없는 경우 고려해서 로직 다시 작성
          <div className="">도착한 토스트가 없어요 ㅠㅠ</div>
        )}
      </div>
    </div>
  );
}
