'use client';

import { useEffect, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
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
        <div className="w-full px-6 flex flex-col gap-1">
          <Button size="md" color="disabled">
            다음
          </Button>
          <Button size="md" color="secondary">
            토스트 굽기
          </Button>
          <Button size="sm" color="primary">
            팔로우
          </Button>
          <Button size="sm" color="subDisabled">
            팔로잉
          </Button>
          <Button size="sm" color="active">
            프로필 편집
          </Button>
          <Button size="md" color="active">
            다음
          </Button>
        </div>

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

      <BottomBar />
    </div>
  );
}
