'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      Hello World
      <p className="text-red-500 font-bold">test text</p>
      <button onClick={() => router.push('/login')}>
        로그인 페이지로 이동
      </button>
    </div>
  );
}
