import { useState } from 'react';

import Button from '@/components/common-components/button';

import InputForm from '@/components/input-form/InputForm';

import defaultImg from '../../../public/images/default-toast.png';
import tempImg from '../../../public/images/timetoast.png';

import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

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

export default function ToastDecoForm() {
  const [selectToast, setSelectToast] = useState<string | StaticImport>(
    defaultImg,
  );

  const [buttonTopic, setButtonTopic] = useState<any>(toastTopic[0]);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    toastTopic[0].title,
  );

  const handleButtonClick = (title: string) => {
    setSelectedTopic(title);
    const topic = toastTopic.find((topic) => topic.title === title);
    if (topic) setButtonTopic(topic);
  };

  // TODO: to get nickname global-state
  const nickname = '채민';

  return (
    <div className="w-full h-full py-6 flex flex-col justify-between">
      <div className="px-6">
        <InputForm title={`${nickname}님의 토스트를 꾸며보세요!`}>
          <Image
            className="mx-auto pt-8"
            src={selectToast}
            alt=""
            width={200}
            height={200}
          />
        </InputForm>
      </div>

      <div className="w-full h-full max-h-[405px] py-6 flex flex-col justify-between px-6 border-t-2 border-gray-10 rounded-t-[20px]">
        <div>
          <div className="w-full flex justify-between gap-3">
            {toastTopic.map((item) => {
              return (
                <Button
                  key={item.title}
                  size="md"
                  onClick={() => handleButtonClick(item.title)}
                  color={selectedTopic === item.title ? 'primary' : 'disabled'}
                  className="flex-1 rounded-[20px] h-[36px]"
                >
                  {item.title}
                </Button>
              );
            })}
          </div>

          <div className="w-full h-full grid grid-cols-3 mt-6 gap-x-4 gap-y-6 max-h-[220px] overflow-y-auto">
            {buttonTopic.imgArr.map((option: ToastOptionsProps) => (
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
                  onClick={() => setSelectToast(option.src)}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          color={selectToast !== defaultImg ? 'active' : 'disabled'}
          // onClick={handleSubmit}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
