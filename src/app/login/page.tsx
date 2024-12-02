'use client';

import GoogleButton from '@/components/login/GoogleButton';
import KakaoButton from '@/components/login/KakaoButton';

import MainImage from '../../../public/images/landing/login-thumbnail.png';

import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="px-0 h-screen flex flex-col justify-between bg-white">
      <div className="h-full flex flex-col items-center justify-center">
        <Image src={MainImage} alt="timetoast" className="" />

        <div className="w-full flex flex-1 justify-center px-6 flex-col gap-4 mb-[48px]">
          <KakaoButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
