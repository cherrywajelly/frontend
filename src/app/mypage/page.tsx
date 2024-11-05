'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import Showcase from '@/components/mypage/Showcase';

import MyFeed from '@/containers/mypage/MyFeed';
import MyInfo from '@/containers/mypage/MyInfo';

export default function MyPage() {
  return (
    <div className="w-full h-lvh">
      <TopBar title="마이페이지" isRight="setting" />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        <MyInfo />
        <Showcase isMine={true} />
        <MyFeed />
      </div>

      <div className="pt-[96px]" />
      <BottomBar />
    </div>
  );
}
