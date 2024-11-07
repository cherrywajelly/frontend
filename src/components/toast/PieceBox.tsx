import Dropdown from '@/components/common-components/dropdown/Dropdown';

import temp from '../../../public/images/lcm.jpeg';

import clsx from 'clsx';
import Image from 'next/image';

export type PieceBoxProps = {
  handleDelete?: () => void;
  isList?: boolean;
};

export default function PieceBox(props: PieceBoxProps) {
  const { handleDelete, isList = false } = props;

  return (
    <div className="flex flex-col gap-4 py-6 px-5 bg-white rounded-[10px] border border-gray-10">
      <div className="flex gap-4">
        <Image
          src={temp}
          alt=""
          width={56}
          height={56}
          className="object-cover w-[56px] h-[56px] rounded-[10px]"
        />

        <div className="flex-1 flex-col space-y-2">
          <span className="text-body1 text-gray-80">{'title'}</span>

          <span className="flex gap-1 items-center">
            <Image
              src={temp}
              alt=""
              width={24}
              height={24}
              className="object-cover rounded-full w-[24px] h-[24px]"
            />
            <span className="text-gray-80 text-body4">{'groupUser'}</span>
          </span>
        </div>

        {!isList && handleDelete && (
          <Dropdown
            items={[{ label: '삭제하기', onClick: handleDelete }]}
            size="sm"
          />
        )}
      </div>

      {/* contents */}
      <div
        className={clsx(
          'text-body2 text-black-main',
          isList ? 'line-clamp-3' : '',
        )}
      >
        뭐 써야되는지 고민하고 있었는데 도휘가 하니 예브다 라고 해서 뭔가 웃긴데
        그렇다고 막 빵터질 정도는 아닌데 약간 자기 전에 생각날 것 같은 그런뭐
        써야되는지 고민하고 있었는데 도휘가 하니 예브다 라고 해서 뭔가 웃긴데
        그렇다고 막 빵터질 정도는 아닌데 약간 자기 전에 생각날 것 같은 그런헤헤
      </div>

      {/* images */}
      <div className="flex flex-col gap-2">
        <div className="w-full flex gap-1">
          <Image
            src={temp}
            alt=""
            className="w-1/2 h-[154px] object-cover rounded-[8px] border border-gray-10"
          />
          <div
            className={clsx(
              'w-1/2 h-[154px] relative rounded-[8px] border border-gray-10 overflow-hidden',
              isList ? 'bg-black bg-opacity-60' : '',
            )}
          >
            <Image
              src={temp}
              alt=""
              className={clsx(
                'object-cover w-full h-full',
                isList ? 'opacity-40' : '',
              )}
            />
            {isList && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-body1">
                더보기
              </span>
            )}
          </div>
        </div>
        {!isList && (
          <Image
            src={temp}
            alt=""
            className="w-full h-[154px] object-cover rounded-[8px] border border-gray-10"
          />
        )}
      </div>

      {/* date */}
      <span className="text-gray-60 text-body4 text-right">
        2024년 11월 11일
      </span>
    </div>
  );
}
