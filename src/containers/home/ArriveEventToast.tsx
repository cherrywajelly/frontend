import Button from '@/components/common-components/button';

import ToastBox from '@/components/toast/ToastBox';

import {
  useGetFollowingUserEventToast,
  useGetUserEventToastList,
} from '@/hooks/api/useEventToast';

import tempImg from '../../../public/images/timetoast.png';

export default function ArriveEventToast() {
  const { data, isLoading } = useGetFollowingUserEventToast();
  console.log(data);

  return (
    <div className="mt-6">
      <span className="text-gray-80 text-subtitle1">
        친구의 토스트에 잼을 발라볼까요?
      </span>
      <div className="mt-4 flex flex-col gap-4">
        {data ? (
          data.map((item: any) => {
            return (
              <ToastBox
                key={item.event_toast_id}
                title={item.title}
                //   TODO: profile img로 바꾸기
                profileImg={item.icon.icon_image_url}
                toastImg={item.icon.icon_image_url}
                nickname="chaemin"
                openDate="2024-11-11"
              >
                <Button size="sm" color="primary">
                  잼 바르기
                </Button>
              </ToastBox>
            );
          })
        ) : (
          <div>텅</div>
        )}

        <ToastBox
          title="캡디종강"
          toastImg={tempImg}
          profileImg={tempImg}
          nickname="chaemin"
          openDate="2024-11-11"
        >
          <Button size="sm" color="primary">
            잼 바르기
          </Button>
        </ToastBox>

        <ToastBox
          title="캡디종강"
          toastImg={tempImg}
          profileImg={tempImg}
          nickname="chaemin"
          openDate="2024-11-11"
        >
          <Button size="sm" color="primary">
            잼 바르기
          </Button>
        </ToastBox>
      </div>
    </div>
  );
}
