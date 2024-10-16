'use client';

import googleLogo from '../../../public/images/button/google.svg';

import Image from 'next/image';

export default function GoogleButton() {
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email&access_type=offline`;

  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = googleUrl;
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full px-5 py-[14px] flex items-center bg-white rounded-[10px] border border-[#E4E4E4]"
    >
      <Image src={googleLogo} alt="google" />
      <span className="flex justify-center m-auto items-center text-black-main text-body2 text-center">
        구글 계정으로 시작하기
      </span>
    </button>
  );
}
