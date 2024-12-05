'use client';

import { useEffect, useState } from 'react';

import Spinner from '@/components/common-components/spinner';

import Carousel from '@/containers/landing/Carousel';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }, []);

  useEffect(() => {
    if (refreshToken) {
      router.push('/home');
    }
  }, [accessToken, router, refreshToken]);

  return (
    <div className="w-full h-lvh p-6 bg-white">
      {!accessToken ? (
        <div className="h-full text-center relative box-border w-full flex flex-col justify-center items-center">
          <Carousel />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
