import { useState } from 'react';

import {
  useGetMarketJamIcons,
  useGetMarketToastIcons,
} from '@/hooks/api/useIconGroups';

import { tabVariants } from '../mypage/MyFeed';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function IconMarketTabList() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  const { data: jamIcons, isLoading: isLoadingJamIcons } =
    useGetMarketJamIcons();
  const { data: toastIcons, isLoading: isLoadingToastIcons } =
    useGetMarketToastIcons();

  const iconLists = [toastIcons, jamIcons];
  const router = useRouter();

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
          {iconLists[activeTab] &&
            iconLists[activeTab].map((item, idx) => (
              <div
                className="flex gap-4 py-2 bg-white"
                key={idx}
                onClick={() =>
                  router.push(`/setting/market/${item.iconGroupId}`)
                }
              >
                <Image
                  src={item.thumbnailImageUrl ?? ''}
                  alt=""
                  width={56}
                  height={56}
                  className="object-cover"
                />

                <div className="flex-1 flex-col space-y-2">
                  <span className="text-body1 text-gray-80">{item.title}</span>
                  <span className="flex gap-1 items-center">
                    <span className="text-gray-80 text-body4">
                      {item.creatorNickname}
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
