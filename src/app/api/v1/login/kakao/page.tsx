'use client';

import React, { useEffect, useState } from 'react';

import Spinner from '@/components/common-components/spinner';

import { useKakaoToken } from '@/hooks/api/useLogin';

import { useRouter } from 'next/navigation';

const KakaoCallback = () => {
  const router = useRouter();

  const [kakaoCode, setKakaoCode] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = new URL(window.location.href).searchParams.get('code') || '';
      setKakaoCode(code);
    }
  }, []);

  const { data, isLoading, error } = useKakaoToken(kakaoCode);

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error('Error fetching Kakao token:', error);
      router.push('/');
      return;
    }

    if (data) {
      const accessToken: string | undefined = data.accessToken;
      const refreshToken: string | undefined = data.refreshToken;
      if (accessToken && refreshToken) {
        window.sessionStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);
      }
      if (data.isNew) {
        router.push('/sign-up');
      } else {
        router.push('/home');
      }
    } else {
      // console.log(data);
    }
  }, [data, isLoading, error, router]);

  return isLoading ? (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default KakaoCallback;
