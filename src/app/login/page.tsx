'use client';

import GoogleButton from '@/components/login/GoogleButton';
import KakaoButton from '@/components/login/KakaoButton';

import MainImage from '../../../public/images/landing/login-thumbnail.png';

import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-white">
      <div className="h-full flex flex-col items-center justify-center">
        <Image src={MainImage} alt="timetoast" className="w-[500px]" />

        <div className="w-full flex flex-1 justify-center px-6 box-border flex-col gap-4 my-[48px]">
          <KakaoButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
