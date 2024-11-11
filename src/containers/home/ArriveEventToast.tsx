import Button from '@/components/common-components/button';
import CustomSkeleton from '@/components/common-components/skeleton';

import ToastBox from '@/components/toast/ToastBox';

import { useGetFollowingUserEventToast } from '@/hooks/api/useEventToast';

import tempImg from '../../../public/images/timetoast.png';

import { useRouter } from 'next/navigation';

export default function ArriveEventToast() {
  const { data, isLoading } = useGetFollowingUserEventToast();
  const router = useRouter();

  return (
    <div className="mt-6">
      <span className="text-gray-80 text-subtitle1">
        친구의 토스트에 잼을 발라볼까요?
      </span>
      <div className="mt-4 flex flex-col gap-4">
        {isLoading ? (
          <CustomSkeleton height={178} />
        ) : data ? (
          data.map((item) => {
            return (
              <ToastBox
                key={item.eventToastId}
                title={item.title}
                //   TODO: profile img로 바꾸기
                profileImg={item.icon.iconImageUrl}
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
          <div>텅</div>
        )}
      </div>
    </div>
  );
}
