'use client';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import ToastBox from '@/components/toast/ToastBox';

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
        {/* <ToastBox
            title='sss'
            toastImg={data.iconImageUrl}
            profileImg={tempImg}
            nickname={data.giftToastOwner}
            openDate={data.openedDate}
          >
            <Button size="sm" color="primary">
              잼 바르기
            </Button>
          </ToastBox> */}
        <div>
          <title>현재 9명의 친구들이 잼을 발라줬어요.</title>
        </div>
      </div>
    </div>
  );
}
