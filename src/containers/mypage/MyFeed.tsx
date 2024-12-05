import { useState, useMemo } from 'react';

import Input from '@/components/common-components/input';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
    setSearchValue('');
  };

  const { data: giftToastListData } = useGetGiftToastList();
  const { data: eventToastListData } = useGetEventToastList();
  const { mutate: deleteGiftToast } = useDeleteGiftToast();
  const { mutate: deleteEventToast } = useDeleteEventToast();

  const filteredEventToastList = useMemo(() => {
    if (!eventToastListData) return [];
    return eventToastListData.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [eventToastListData, searchValue]);

  const filteredGiftToastList = useMemo(() => {
    if (!giftToastListData) return [];
    return giftToastListData.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [giftToastListData, searchValue]);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col flex-1">
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
          캡슐 토스트
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-col flex-1 gap-4 p-6 box-border !bg-white',
          (activeTab === 0 &&
            (!filteredEventToastList || filteredEventToastList.length === 0)) ||
            (activeTab === 1 &&
              (!filteredGiftToastList || filteredGiftToastList.length === 0))
            ? ''
            : 'bg-white',
        )}
      >
        <div className="flex items-center flex-none">
          <Input
            size="sm"
            placeholder={
              activeTab === 0
                ? '검색할 토스트 이름을 입력하세요.'
                : '검색할 토스트 이름을 입력하세요.'
            }
            search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!searchValue) {
                setIsFocused(false);
              }
            }}
            className={`transition-all duration-300 ${
              isFocused ? 'w-[calc(100%-20px)]' : 'w-full'
            }`}
          />
          {isFocused && (
            <span
              onClick={handleCancel}
              className="pl-4 whitespace-nowrap text-body1 text-gray-40 transition-opacity duration-300 opacity-100"
            >
              취소
            </span>
          )}
        </div>

        {activeTab === 0
          ? filteredEventToastList?.map((item) => {
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
          : filteredGiftToastList?.map((item) => {
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
