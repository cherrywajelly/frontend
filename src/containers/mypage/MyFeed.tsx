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

import tempImg from '../../../public/images/default-toast.png';

import clsx from 'clsx';

export const tabVariants = {
  common: 'w-full py-2 text-center',
  default: 'text-gray-40 text-body1',
  active: 'text-gray-80 text-body1 border-b-2 border-primary-main',
};

export const tempData = [
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
  { image: tempImg, title: '타이틀입니당', date: '2020년 4월 3일' },
];

export default function MyFeed() {
  const [activeTab, setActiveTab] = useState<number>(0);

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
    <>
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

      <div className="bg-white p-6 h-full">
        <div className="flex flex-col gap-4">
          {activeTab === 0
            ? eventToastListData?.map((item: any) => {
                return (
                  <MyEventToastItem
                    key={item.event_toast_id}
                    image={item.icon.icon_image_url}
                    title={item.title}
                    date={item.opened_date}
                    handleDelete={() => {
                      deleteEventToast(item.event_toast_id);
                    }}
                  />
                );
              })
            : giftToastListData?.giftToastResponses.map(
                (item: any, idx: number) => {
                  return (
                    <MyGiftToastItem
                      key={idx}
                      image={item.iconImageUrl}
                      title={item.title}
                      groupUser={item.giftToastOwner}
                      handleDelete={() => {
                        deleteGiftToast(item.giftToastId);
                      }}
                    />
                  );
                },
              )}
        </div>
      </div>
    </>
  );
}
