'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common-components/button';
import Spinner from '@/components/common-components/spinner';

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
    <div className="w-full h-screen">
      {!accessToken ? (
        <div className="p-6 box-border w-full h-screen flex flex-col justify-center items-center">
          <Image src={Logo} alt="timetoast" />
          <h1 className="text-subtitle1">타임토스트</h1>
          <h3>지속가능한 추억 아카이빙 서비스</h3>
          <Button
            color="active"
            className="w-full mt-8"
            onClick={() => {
              router.push('/login');
            }}
          >
            타임토스트 시작하기
          </Button>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
