import { useEffect, useMemo, useRef, useState } from 'react';

import Button from '@/components/common-components/button';

import InputForm from '@/components/input-form/InputForm';

import {
  useGetIconGroupsJams,
  useGetIconGroupsToasts,
} from '@/hooks/api/useIconGroups';
import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import defaultImg from '../../../public/images/default-toast.png';
import tempImg from '../../../public/images/timetoast.png';

import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';

export type ToastOptionsProps = {
  name: string;
  src: StaticImageData;
};

export type ToastFormProps = {
  stepState: RecoilState<number>;
  dataState: RecoilState<pieceData | ToastData>;
  handleSubmit?: () => void;
  isMainToast?: boolean;
  type: 'toast' | 'jam';
};

export default function ToastDecoForm(props: ToastFormProps) {
  const {
    stepState,
    dataState,
    handleSubmit,
    isMainToast = true,
    type,
  } = props;

  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [toastData, setToastData] = useRecoilState(dataState);

  const nickname =
    typeof window !== 'undefined' && sessionStorage.getItem('nickname');

  const toastBoxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (toastBoxRef.current) {
      toastBoxRef.current.scrollTo(0, 0);
    }
  };

  const { data: jamIconsData } = useGetIconGroupsJams();
  const { data: toastIconsData } = useGetIconGroupsToasts();

  const data = type === 'jam' ? jamIconsData : toastIconsData;

  const filteredIcons = useMemo(() => {
    return data?.find((group) => group.name === selectedTopic)?.icon || [];
  }, [data, selectedTopic]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedTopic(data[0].name);
    }
  }, [data]);

  const handleButtonClick = (name: string) => {
    scrollToTop();
    setSelectedTopic(name);
  };

  return (
    <div className="w-full h-full pt-6 flex flex-col justify-between">
      <div className="px-6">
        <InputForm title={`${nickname}님의 토스트를 꾸며보세요!`}>
          <Image
            className="mx-auto mt-8 border-2 w-[200px] h-[200px] object-cover"
            src={toastData.deco as string}
            alt=""
            width={200}
            height={200}
          />
        </InputForm>
      </div>

      <div className="bg-white w-full h-full pt-6 pb-12 max-h-[405px] flex flex-col justify-between px-6 border-t-2 border-gray-10 rounded-t-[20px]">
        <div>
          <div className="w-full flex gap-3">
            {data?.map((item) => {
              return (
                <Button
                  key={item.iconGroupId}
                  size="sm"
                  onClick={() => handleButtonClick(item.name)}
                  color={selectedTopic === item.name ? 'primary' : 'disabled'}
                  className="max-w-[111px] flex-1 rounded-[20px] !h-[36px]"
                >
                  {item.name}
                </Button>
              );
            })}
          </div>

          <div
            ref={toastBoxRef}
            className="w-full h-full grid grid-cols-3 mt-6 gap-x-4 gap-y-6 max-h-[200px] overflow-y-auto"
          >
            {filteredIcons &&
              filteredIcons.map((icon) => (
                <div
                  key={icon.iconId}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={icon.iconImageUrl}
                    alt={icon.iconId.toString()}
                    width={80}
                    height={80}
                    className="cursor-pointer w-[80px] h-[80px] object-cover"
                    onClick={() =>
                      setToastData((prev) => ({
                        ...prev,
                        deco: icon.iconImageUrl,
                        iconId: icon.iconId,
                      }))
                    }
                  />
                </div>
              ))}
          </div>
        </div>

        <Button
          color={toastData.deco !== defaultImg ? 'active' : 'disabled'}
          onClick={handleSubmit}
          disabled={toastData.deco == defaultImg}
        >
          {isMainToast ? '토스트 생성' : '다음'}
        </Button>
      </div>
    </div>
  );
}
