import { IoIosArrowForward } from 'react-icons/io';

import { ShowcaseProps } from '@/types/mypage';

import tempImg from '../../../public/images/default-toast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Showcase(props: ShowcaseProps) {
  const { isMine, nickname, data } = props;
  const router = useRouter();

  const handleEdit = () => {
    router.push('/mypage/showcase');
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
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              className="w-1/3 bg-white border border-gray-10 p-4 rounded-[10px]"
              key={item.eventToastId}
            >
              <Image
                src={item.iconUrl || tempImg}
                alt="진열 아이콘"
                width={100}
                height={100}
                className="object-cover w-full h-auto"
              />
            </div>
          ))}

        {data && !data.length && (
          <div className="w-full text-center text-body4 bg-white border border-gray-10 p-4 rounded-[10px]">
            진열장이 비어있어요.
          </div>
        )}
      </div>
    </div>
  );
}
