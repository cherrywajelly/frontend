import { Dispatch, SetStateAction } from 'react';

import Button from '@/components/common-components/button';

import { useGetPremiumsInfo } from '@/hooks/api/usePremiums';

import clsx from 'clsx';

const variants = {
  title: 'text-black-main text-body1 w-1/3 text-center break-keep m-auto',
  text: 'text-gray-80 text-body2 w-1/3 text-center break-keep m-auto',
  activeStyle: '!h-[70px] w-1/3 rounded-[6px] border border-secondary-main',
  defaultStyle:
    '!h-[70px] w-1/3 rounded-[6px] !bg-gray-05 text-gray-80 border border-gray-80',
};

export type PremiumsInfoProps = {
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
};

export default function PremiumsInfo(props: PremiumsInfoProps) {
  const { selectedItem, setSelectedItem } = props;

  const { data, isLoading } = useGetPremiumsInfo();
  console.log('data', data);

  return (
    <div className="mt-[60px] h-full">
      <div className="flex justify-end gap-3 items-center">
        <div className="h-[70px] w-1/3" />
        <Button
          onClick={() => setSelectedItem('BASIC')}
          className={clsx(
            selectedItem === 'BASIC'
              ? variants.activeStyle
              : variants.defaultStyle,
          )}
          color={selectedItem === 'BASIC' ? 'secondary' : 'disabled'}
        >
          BASIC
        </Button>
        <Button
          onClick={() => setSelectedItem('PREMIUM')}
          className={clsx(
            selectedItem === 'PREMIUM'
              ? variants.activeStyle
              : variants.defaultStyle,
          )}
          color={selectedItem === 'PREMIUM' ? 'secondary' : 'disabled'}
        >
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
