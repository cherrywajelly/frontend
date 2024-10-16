'use client';

import React, { useEffect } from 'react';

import { useKakaoToken } from '@/hooks/api/useLogin';

import { useRouter } from 'next/navigation';

const KakaoCallback = () => {
  const router = useRouter();

  let kakaoCode: string = '';

  if (typeof window !== 'undefined') {
    kakaoCode = new URL(window.location.href).searchParams.get('code') || '';
  }

  const { data, isLoading, error } = useKakaoToken(kakaoCode);

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error('Error fetching Kakao token:', error);
      return;
    }

    if (data) {
      router.push('/');
    } else {
      //   router.push('/');
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