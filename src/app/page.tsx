'use client';

import { useEffect } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import ArriveToast from '@/containers/home/ArriveToast';

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
      <TopBar title="Time Toast" />

      <div className="w-full h-[calc(100vh-48px)] p-6 bg-gray-05">
        <ArriveToast />
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
      <div className="pt-[96px]" />
      <BottomBar />
    </div>
  );
}
