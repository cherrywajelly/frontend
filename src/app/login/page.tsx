'use client';

import GoogleButton from '@/components/login/GoogleButton';
import KakaoButton from '@/components/login/KakaoButton';

export default function Home() {
  return (
    <div className="border border-black p-4">
      <div>toast 캐릭터 이미지 넣기</div>
      <div className="flex flex-col gap-4">
        <KakaoButton />
        <GoogleButton />
      </div>
    </div>
  );
}
