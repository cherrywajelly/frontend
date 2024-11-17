'use client';

import kakaoLogo from '../../../public/images/button/kakao.svg';

import Image from 'next/image';

export default function KakaoButton() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full px-5 py-[14px] flex items-center bg-[#FEE500] rounded-[10px]"
    >
      <Image src={kakaoLogo} alt="kakao" />
      <span className="flex justify-center m-auto items-center text-black-main text-body2 text-center">
        카카오로 시작하기
      </span>
    </button>
  );
}
