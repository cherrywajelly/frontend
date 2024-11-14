import { useEffect, useRef, useState } from 'react';

import Button from '@/components/common-components/button';

import InputForm from '@/components/input-form/InputForm';

import { useGetIconGroups } from '@/hooks/api/useIconGroups';
import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import defaultImg from '../../../public/images/default-toast.png';
import tempImg from '../../../public/images/timetoast.png';

import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';

export type ToastOptionsProps = {
  name: string;
  src: StaticImageData;
};

const defaultToastOptions = [
  { name: 'red', src: defaultImg },
  { name: 'asd', src: tempImg },
  { name: 'sdf', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
];

const christmasToastOptions = [
  { name: 'red', src: tempImg },
  { name: 'asd', src: tempImg },
  { name: 'sdf', src: tempImg },
  { name: 'cc', src: tempImg },
  { name: 'cc', src: tempImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
  { name: 'cc', src: defaultImg },
];

const toastTopic = [
  { title: '기본', imgArr: defaultToastOptions },
  { title: '크리스마스', imgArr: christmasToastOptions },
  { title: '설날', imgArr: defaultToastOptions },
];

export type ToastFormProps = {
  stepState: RecoilState<number>;
  dataState: RecoilState<pieceData | ToastData>;
  handleSubmit?: () => void;
  isMainToast?: boolean;
};

export default function ToastDecoForm(props: ToastFormProps) {
  const { stepState, dataState, handleSubmit, isMainToast = true } = props;

  const [buttonTopic, setButtonTopic] = useState<any>(toastTopic[0]);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    toastTopic[0].title,
  );

  const setStep = useSetRecoilState(stepState);
  const [toastData, setToastData] = useRecoilState(dataState);
  const [iconList, setIconList] = useState<any[]>([]);

  const handleButtonClick = (name: string) => {
    scrollToTop();
    setSelectedTopic(name);
    const selectedGroup = data?.find((group) => group.name === name);
    console.log('selectedGroup', selectedGroup);
    if (selectedGroup) {
      setIconList(selectedGroup.icon || []);
    }
    console.log('iconList', iconList);
  };

  const nickname =
    typeof window !== 'undefined' && localStorage.getItem('nickname');

  const toastBoxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (toastBoxRef.current) {
      toastBoxRef.current.scrollTo(0, 0);
    }
  };

  const { data } = useGetIconGroups();

  console.log('data', data);

  const selectedTemp = data && data.length > 0 ? data[0].name : '';

  const filteredIcons =
    data?.find((group) => group.name === selectedTemp)?.icon || [];

  console.log('filteredIcons', filteredIcons);

  return (
    <div className="w-full h-full pt-6 flex flex-col justify-between">
      <div className="px-6">
        <InputForm title={`${nickname}님의 토스트를 꾸며보세요!`}>
          <Image
            className="mx-auto mt-8 border-2"
            src={toastData.deco as string}
            alt=""
            width={200}
            height={200}
          />
        </InputForm>
      </div>

      <div className="bg-white w-full h-full pt-6 pb-12 max-h-[405px] flex flex-col justify-between px-6 border-t-2 border-gray-10 rounded-t-[20px]">
        <div>
          <div className="w-full flex justify-between gap-3">
            {/* {toastTopic.map((item, idx) => {
              return (
                <Button
                  key={idx}
                  size="sm"
                  onClick={() => handleButtonClick(item.title)}
                  color={selectedTopic === item.title ? 'primary' : 'disabled'}
                  className="max-w-[111px] flex-1 rounded-[20px] !h-[36px]"
                >
                  {item.title}
                </Button>
              );
            })} */}

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
            {/* {buttonTopic.imgArr.map((option: ToastOptionsProps) => (
              <div
                key={option.name}
                className="flex items-center justify-center"
              >
                <Image
                  src={option.src}
                  alt={option.name}
                  width={80}
                  height={80}
                  className="cursor-pointer"
                  onClick={() =>
                    setToastData((prev) => ({ ...prev, deco: option.src }))
                  }
                />
              </div>
            ))} */}

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
