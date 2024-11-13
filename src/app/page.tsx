'use client';

import { useEffect } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import ArriveEventToast from '@/containers/home/ArriveEventToast';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const accessToken =
    typeof window !== 'undefined' && sessionStorage.getItem('accessToken');

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
  };

  const handleLogin = () => {
    router.push('/login');
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen">
      <TopBar title="Time Toast" isBackBtn={false} />

      <div className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto p-6 bg-gray-05">
        <ArriveGiftToast />
        <ArriveEventToast />
      </div>
      {accessToken ? (
        <button className="border rounded p-2" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <button className="border rounded p-2" onClick={handleLogin}>
          로그인
        </button>
      )}
      {/* TODO: 빼기 */}
      <div className="pt-[100px]" />
      <BottomBar />
    </div>
  );
}
