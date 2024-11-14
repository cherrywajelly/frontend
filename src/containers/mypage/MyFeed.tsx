import { useState } from 'react';

import MyEventToastItem from '@/components/mypage/MyEventToastItem';
import MyGiftToastItem from '@/components/mypage/MyGiftToastItem';

import {
  useDeleteEventToast,
  useGetEventToastList,
} from '@/hooks/api/useEventToast';
import {
  useDeleteGiftToast,
  useGetGiftToastList,
} from '@/hooks/api/useGiftToast';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export const tabVariants = {
  common: 'w-full py-2 text-center',
  default: 'text-gray-40 text-body1',
  active: 'text-gray-80 text-body1 border-b-2 border-primary-main',
};

export default function MyFeed() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  const { data: giftToastListData, isLoading: isLoadingGiftToastList } =
    useGetGiftToastList();
  const { data: eventToastListData, isLoading: isLoadingEventToastList } =
    useGetEventToastList();
  const { mutate: deleteGiftToast, isPending } = useDeleteGiftToast();
  const { mutate: deleteEventToast, isPending: isPendingDeleteEventToast } =
    useDeleteEventToast();

  return (
    <div>
      <div className="w-full flex border-b border-gray-10 px-6">
        <div
          className={clsx(
            tabVariants.common,
            `${activeTab === 0 ? tabVariants.active : tabVariants.default}`,
          )}
          onClick={() => handleTabClick(0)}
        >
          이벤트 토스트
        </div>

        <div
          className={clsx(
            tabVariants.common,
            `${activeTab === 1 ? tabVariants.active : tabVariants.default}`,
          )}
          onClick={() => handleTabClick(1)}
        >
          선물 토스트
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-col gap-4 p-6 box-border',
          (activeTab === 0 &&
            (!eventToastListData || eventToastListData.length === 0)) ||
            (activeTab === 1 &&
              (!giftToastListData || giftToastListData.length === 0))
            ? ''
            : 'bg-white',
        )}
      >
        {activeTab === 0
          ? eventToastListData?.map((item) => {
              return (
                <MyEventToastItem
                  key={item.eventToastId}
                  image={item.icon.iconImageUrl}
                  title={item.title}
                  date={item.openedDate}
                  handleDelete={() => {
                    deleteEventToast(item.eventToastId);
                  }}
                  onClick={() =>
                    router.push(`/event-toast/${item.eventToastId}`)
                  }
                />
              );
            })
          : giftToastListData?.map((item) => {
              return (
                <MyGiftToastItem
                  key={item.giftToastId}
                  image={item.iconImageUrl}
                  title={item.title}
                  groupUser={item.giftToastOwner}
                  onClick={() => router.push(`/gift-toast/${item.giftToastId}`)}
                  handleDelete={() => {
                    deleteGiftToast(item.giftToastId);
                  }}
                />
              );
            })}
      </div>
    </div>
  );
}
