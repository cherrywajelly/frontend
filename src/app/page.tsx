'use client';

import { useEffect } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

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
      <TopBar />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-h2 pt-8">안녕하세요..Team 2 cherry wa jelly</h1>
        <span className="text-h3 py-2">안녕하세요. TimeToast입니다.</span>
        <br />
        <br />

        <br />

        {accessToken ? (
          <button className="border rounded p-2" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button className="border rounded p-2" onClick={handleLogin}>
            로그인
          </button>
        )}
      </div>
      <div className="pt-[96px]" />
      <BottomBar />
    </div>
  );
}
