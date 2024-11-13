'use client';

import { useMemo } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import Showcase from '@/components/mypage/Showcase';

import { useGetMyShowcase } from '@/hooks/api/useMyPage';
import { MyShowcaseResponse } from '@/types/api/mypage';

import MyFeed from '@/containers/mypage/MyFeed';
import MyInfo from '@/containers/mypage/MyInfo';

export default function MyPage() {
  const { data, isLoading } = useGetMyShowcase();

  const showcaseDataList = useMemo(
    () =>
      data?.map(
        (item) =>
          ({
            eventToastId: item.eventToastId,
            iconUrl: item.iconUrl,
          }) as MyShowcaseResponse,
      ) ?? [],
    [data],
  );

  const nickname =
    typeof window !== 'undefined' && localStorage.getItem('accesstoken');

  return (
    <div className="w-full h-lvh">
      <TopBar title="마이페이지" isRight="setting" />

      <div className="h-[calc(100vh-144px)] flex flex-grow flex-col bg-gray-05 overflow-y-auto">
        <MyInfo />
        <Showcase
          isMine={true}
          data={showcaseDataList}
          nickname={nickname as string}
        />
        <MyFeed />
      </div>

      <BottomBar />
    </div>
  );
}
