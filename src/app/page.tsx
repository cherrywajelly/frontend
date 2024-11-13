'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import ArriveEventToast from '@/containers/home/ArriveEventToast';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';

import { useRouter } from 'next/navigation';

export default function Home() {
  const accessToken =
    typeof window !== 'undefined' && sessionStorage.getItem('accessToken');
  const router = useRouter();

  if (!accessToken) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Button onClick={() => router.push('/login')}>로그인하러가기</Button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <TopBar title="Time Toast" isBackBtn={false} />

      <div className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto p-6 bg-gray-05">
        <ArriveGiftToast />
        <ArriveEventToast />
      </div>

      <BottomBar />
    </div>
  );
}
