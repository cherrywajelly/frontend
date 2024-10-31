'use client';

import TopBar from '@/components/common-components/top-bar';

import { useRouter } from 'next/navigation';

export default function JamPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="잼 바르기" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        <div>컴포넌트</div>
        <div>
          <title>현재 9명의 친구들이 잼을 발라줬어요.</title>
        </div>
      </div>
    </div>
  );
}
