import { useState } from 'react';

import tempImg from '../../../public/images/default-toast.png';
import { tabVariants } from '../mypage/MyFeed';

import clsx from 'clsx';
import Image from 'next/image';

const tempMarketIconList = [
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
];

const tempMarketIconList2 = [
  { image: tempImg, title: '123123123', creator: '크리에이터임요' },
  { image: tempImg, title: 'www', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
  { image: tempImg, title: '타이틀입니당', creator: '크리에이터임요' },
];

const iconLists = [tempMarketIconList, tempMarketIconList2];

export default function IconMarketTabList() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="w-full flex border-b border-gray-10 px-6">
        {['토스트 아이콘', '잼 아이콘'].map((tabName, index) => (
          <div
            key={index}
            className={clsx(
              tabVariants.common,
              `${activeTab === index ? tabVariants.active : tabVariants.default}`,
            )}
            onClick={() => handleTabClick(index)}
          >
            {tabName}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 w-full h-full">
        <div className="flex flex-col gap-4">
          {iconLists[activeTab].map((item, idx) => (
            <div className="flex gap-4 py-2 bg-white" key={idx}>
              <Image
                src={item.image}
                alt=""
                width={56}
                height={56}
                className="object-cover"
              />

              <div className="flex-1 flex-col space-y-2">
                <span className="text-body1 text-gray-80">{item.title}</span>
                <span className="flex gap-1 items-center">
                  <span className="text-gray-80 text-body4">
                    {item.creator}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
