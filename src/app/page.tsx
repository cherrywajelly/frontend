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
    <div className="w-full h-screen p-6 bg-white">
      {!accessToken ? (
        <div className="h-full text-center relative p-6 box-border w-full flex flex-col justify-center items-center">
          <Image src={Logo} alt="timetoast" width={200} height={200} />
          <h1 className="text-[36px] font-bold texet-gray-80">TimeToast</h1>
          <h3 className="text-subtitle2 mt-4 text-gray-80">
            지속적인 공유가 가능한 <br />
            추억 아카이빙 서비스
          </h3>
          <Button
            color="active"
            className="w-full mt-8 absolute bottom-6"
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
