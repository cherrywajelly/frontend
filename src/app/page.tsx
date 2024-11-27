'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common-components/button';
import Spinner from '@/components/common-components/spinner';

import Carousel from '@/containers/landing/Carousel';

import Logo from '../../public/images/timetoast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      router.push('/home');
    }
  }, [accessToken, router]);

  return (
    <div className="w-full h-screen p-6 bg-white">
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
