'use client';

import GoogleButton from '@/components/login/GoogleButton';
import KakaoButton from '@/components/login/KakaoButton';

import TimeToastLogo from '../../../public/images/timetoast.png';

import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="px-4 bg-gray-50 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Image src={TimeToastLogo} alt="timetoast" width={300} height={300} />
        <h1 className="text-h1 italic">TimeToast</h1>
      </div>

      <div className="w-full flex flex-col gap-4 mt-[150px]">
        <KakaoButton />
        <GoogleButton />
      </div>
    </div>
  );
}
