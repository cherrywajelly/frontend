'use client';

import TopBar from '@/components/common-components/top-bar';

import IconMarketTabList from '@/containers/setting/IconMarketTabList';

export default function IconMarketPage() {
  return (
    <div className="w-full h-lvh">
      <TopBar title="아이콘 마켓" />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05 py-6">
        <div className="flex flex-col items-center">
          {/* 탭별 아이콘 리스트*/}
          <IconMarketTabList />
        </div>
      </div>
    </div>
  );
}
