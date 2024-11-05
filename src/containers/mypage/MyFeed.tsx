import { useState } from 'react';

import MyEventToastItem from '@/components/mypage/MyEventToastItem';
import MyGiftToastItem from '@/components/mypage/MyGiftToastItem';

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

const tempData2 = [
  {
    image: '',
    title: 'sdfsdf',
    groupUser: ['chch', 'chaemin', '채민채민', '아아아'],
  },
  {
    image: '',
    title: '타이틀입니당',
    groupUser: ['chch', 'chaemin', '채민채민', '아아아'],
  },
  {
    image: '',
    title: '타이틀입니당',
    groupUser: ['chch', 'chaemin', '채민채민', '아아아'],
  },
  {
    image: '',
    title: '타이틀입니당',
    groupUser: ['chch', 'chaemin', '채민채민', '아아아'],
  },
];

export default function MyFeed() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

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
            ? tempData.map((item, idx) => {
                return (
                  <MyEventToastItem
                    key={idx}
                    image={item.image}
                    title={item.title}
                    date={item.date}
                  />
                );
              })
            : tempData2.map((item, idx) => {
                return (
                  <MyGiftToastItem
                    key={idx}
                    image={item.image}
                    title={item.title}
                    groupUser={item.groupUser}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
