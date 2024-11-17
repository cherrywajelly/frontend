import Button from '@/components/common-components/button';

import { useGetPremiumsInfo } from '@/hooks/api/usePremiums';

const variants = {
  title: 'text-gray-80 text-body1',
};

export default function PremiumsInfo() {
  const { data, isLoading } = useGetPremiumsInfo();

  return (
    <div className="mt-[60px] h-full border border-blue-500">
      <div className="flex justify-end gap-3 items-center">
        <Button className="!h-[70px] w-1/3 rounded-[6px]" color="secondary">
          BASIC
        </Button>
        <Button className="!h-[70px] w-1/3 rounded-[6px]" color="secondary">
          PREMIUM
        </Button>
      </div>

      {/* info */}
      <div className="border border-red-500 h-full">
        <div className="flex">
          <span className={variants.title}>월간 요금</span>
          <span>월간 요금</span>
          <span>월간 요금</span>
        </div>

        <div className="flex">
          <span className={variants.title}>월간 요금</span>
          <span>토스트 조각 내 이미지 개수</span>
          <span>토스트 조각 내 이미지 개수</span>
        </div>

        <div className="flex">
          <span className={variants.title}>월간 요금</span>
          <span>임베드 가능 포맷</span>
          <span>임베드 가능 포맷</span>
        </div>
      </div>
    </div>
  );
}
