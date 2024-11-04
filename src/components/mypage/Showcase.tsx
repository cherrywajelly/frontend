import { IoIosArrowForward } from 'react-icons/io';

import { ShowcaseProps } from '@/types/mypage';

import tempImg from '../../../public/images/default-toast.png';

import Image from 'next/image';

const tempData = [
  { img: tempImg, title: '' },
  { img: tempImg, title: '' },
  { img: tempImg, title: '' },
];

export default function Showcase(props: ShowcaseProps) {
  const { isMine, nickname = 'timetoast' } = props;

  const handleEdit = () => {
    //
  };

  return (
    <div className="px-6 pt-2 pb-6">
      <div className="flex justify-between items-center ">
        <span className="text-body1 text-gray-80">
          {isMine ? '나의 진열장' : `${nickname}님의 진열장`}
        </span>
        {isMine && (
          <button
            onClick={handleEdit}
            className="cursor-pointer flex items-center gap-1 text-body3 text-gray-40"
          >
            편집
            <IoIosArrowForward />
          </button>
        )}
      </div>
      <div className="w-full flex gap-[9px] pt-4">
        {tempData.map((item) => {
          return (
            <div
              className="bg-white border border-gray-10 p-4 rounded-[10px]"
              key={item.title}
            >
              <Image src={item.img} alt={item.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
