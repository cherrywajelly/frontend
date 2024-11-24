import Button from '@/components/common-components/button';

import { useGetPremiumsInfo } from '@/hooks/api/usePremiums';

const variants = {
  title: 'text-black-main text-body1 w-1/3 text-center break-keep m-auto',
  text: 'text-gray-80 text-body2 w-1/3 text-center break-keep m-auto',
};

export default function PremiumsInfo() {
  const { data, isLoading } = useGetPremiumsInfo();

  console.log('data', data);

  return (
    <div className="mt-[60px] h-full">
      <div className="flex justify-end gap-3 items-center">
        <div className="h-[70px] w-1/3" />
        <Button className="!h-[70px] w-1/3 rounded-[6px]" color="secondary">
          BASIC
        </Button>
        <Button className="!h-[70px] w-1/3 rounded-[6px]" color="secondary">
          PREMIUM
        </Button>
      </div>

      {/* info */}
      <div className="h-full mt-[48px] flex flex-col gap-8">
        <div className="flex gap-3">
          <span className={variants.title}>월간 요금</span>
          <span className={variants.text}>무료</span>
          <span className={variants.text}>5,500원</span>
        </div>

        <div className="h-[1px] border-t border-gray-20" />

        <div className="flex gap-3">
          <span className={variants.title}>토스트 조각 내 이미지 개수</span>
          <span className={variants.text}>3개 이하</span>
          <span className={variants.text}>10개 이하</span>
        </div>

        <div className="h-[1px] border-t border-gray-20" />

        <div className="flex gap-3">
          <span className={variants.title}>월간 요금</span>
          <span className={variants.text}>이미지</span>
          <span className={variants.text}>이미지, 영상, 음악</span>
        </div>
      </div>
    </div>
  );
}
