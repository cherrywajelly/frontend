'use client';

import React, { useEffect, useState } from 'react';

import { useKakaoToken } from '@/hooks/api/useLogin';

import { error } from 'console';
import { useRouter } from 'next/navigation';
import router from 'next/router';

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
      return;
    }

    if (data) {
      const accessToken: string | undefined = data.accessToken;
      const refreshToken: string | undefined = data.refreshToken;
      if (accessToken && refreshToken) {
        window.sessionStorage.setItem('accessToken', accessToken);
        window.sessionStorage.setItem('refreshToken', refreshToken);
      }

      data.isNew ? router.push('/sign-up') : router.push('/');
    } else {
      console.log(data);
    }
  }, [data, isLoading, error, router]);

  return isLoading ? (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center">
        {/* <Spinner /> */}
        기다리는중..
      </div>
    </div>
  ) : (
    <></>
  );
};

export default KakaoCallback;
