import { useEffect, useMemo, useRef, useState } from 'react';
import { CiShop } from 'react-icons/ci';

import Button from '@/components/common-components/button';

import InputForm from '@/components/input-form/InputForm';

import {
  useGetIconGroupsJams,
  useGetIconGroupsToasts,
} from '@/hooks/api/useIconGroups';
import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import defaultImg from '../../../public/images/default-toast.png';
import defaultJam from '../../../public/images/defaultJam.png';

import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  isPending?: boolean;
};

export default function ToastDecoForm(props: ToastFormProps) {
  const {
    stepState,
    dataState,
    handleSubmit,
    isMainToast = true,
    type,
    isPending,
  } = props;

  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [toastData, setToastData] = useRecoilState(dataState);
  const [step, setStep] = useRecoilState(stepState);
  const router = useRouter();

  const nickname =
    typeof window !== 'undefined' && sessionStorage.getItem('nickname');

  const toastBoxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (toastBoxRef.current) {
      toastBoxRef.current.scrollTo(0, 0);
    }
  };

  const { data: jamIconsData, refetch: refetchGroupJams } =
    useGetIconGroupsJams();
  const { data: toastIconsData, refetch: refetchGroupToasts } =
    useGetIconGroupsToasts();

  const data = type === 'jam' ? jamIconsData : toastIconsData;

  const filteredIcons = useMemo(() => {
    return data?.find((group) => group.name === selectedTopic)?.icon || [];
  }, [data, selectedTopic]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedTopic(data[0].name);
    }
    refetchGroupJams();
    refetchGroupToasts();
  }, [data, step]);

  const handleButtonClick = (name: string) => {
    scrollToTop();
    setSelectedTopic(name);
  };

  const localTitle =
    type === 'jam'
      ? '당신의 잼을 꾸며보세요!'
      : `${nickname}님의 토스트를 꾸며보세요!`;

  return (
    <div className="w-full h-full pt-6 flex flex-col justify-between">
      <div className="px-6">
        <InputForm title={localTitle}>
          <Image
            className="mx-auto mt-8 w-[200px] h-[200px] object-cover"
            src={toastData.deco as string}
            alt=""
            width={200}
            height={200}
          />
        </InputForm>
      </div>

      <div className="bg-white w-full h-full pt-6 pb-12 max-h-[405px] flex flex-col justify-between px-6 border-t-2 border-gray-10 rounded-t-[20px]">
        <div>
          <div className="w-full flex gap-2 items-center">
            <div className="flex flex-grow gap-3 overflow-x-auto hide-scrollbar">
              {data?.map((item) => {
                return (
                  <Button
                    key={item.iconGroupId}
                    size="sm"
                    onClick={() => handleButtonClick(item.name)}
                    color={selectedTopic === item.name ? 'primary' : 'disabled'}
                    className="!px-4 text-left max-w-[111px] rounded-[20px] !h-[36px]"
                  >
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.name}
                    </span>
                  </Button>
                );
              })}
            </div>

            <div className="h-[28px] border-l border-gray-20" />

            <button>
              <CiShop
                size={36}
                className="text-gray-60"
                onClick={() => router.push('/setting/market')}
              />
            </button>
          </div>

          <div
            ref={toastBoxRef}
            className="w-full h-full grid grid-cols-3 mt-6 gap-x-4 gap-y-6 max-h-[200px] overflow-y-auto hide-scrollbar"
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
                    unoptimized
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
          id="serverCallButton"
          color={
            toastData.deco !== defaultImg && toastData.deco !== defaultJam
              ? 'active'
              : 'disabled'
          }
          onClick={handleSubmit}
          disabled={
            isPending ||
            toastData.deco === defaultImg ||
            toastData.deco === defaultJam
          }
        >
          {isMainToast ? '토스트 생성' : '다음'}
        </Button>
      </div>
    </div>
  );
}
