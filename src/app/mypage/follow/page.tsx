'use client';

import { Suspense } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import { useMyInfo } from '@/hooks/api/useLogin';

import FollowTab from '@/containers/mypage/FollowTab';

import temp from '../../../../public/images/default-toast.png';

import Image from 'next/image';

export default function MyPageFollow() {
  const { data } = useMyInfo();

  return (
    <div className="w-full h-lvh">
      <TopBar title="마이페이지" />

      <div className="h-[calc(100vh-144px)] flex flex-grow flex-col bg-gray-05 py-6 overflow-y-auto">
        <div className="flex flex-col items-center">
          {/* 프로필 이미지 영역 */}
          <Image
            src={data?.profileUrl || temp}
            alt=""
            width={80}
            height={80}
            className="object-cover rounded-full w-[80px] h-[80px]"
          />

          {/* 팔로워-팔로잉-그룹 탭 및 리스트 컴포넌트*/}
          <Suspense>
            <FollowTab />
          </Suspense>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
