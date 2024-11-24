'use client';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import PremiumsInfo from '@/containers/premiums/PremiumsInfo';

export default function PremiumsPage() {
  const handleSubmit = () => {
    // TODO: 이용권 저장 api 연동
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="구독 플랜" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-6 justify-between bg-gray-05 p-6">
        {/* info */}
        <div className="h-full flex flex-col">
          <div className="flex flex-col gap-2">
            <span className="text-black-main text-subtitle3">
              구독할 이용권을 선택하세요.
            </span>
            <span className="text-gray-80 text-body4">
              여기다 뭐를 써야할까? 여기다 뭐를 써야할까? 여기
              <br />
              여기다 뭐를 써야할까?
            </span>
          </div>
          <PremiumsInfo />
        </div>

        {/* button */}
        <Button
          color="active"
          onClick={handleSubmit}
          className="mb-6 flex-none"
        >
          이용권 저장
        </Button>
      </div>
    </div>
  );
}
