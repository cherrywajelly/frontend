import { useEffect, useState } from 'react';

import Dropdown from '@/components/common-components/dropdown/Dropdown';

import { ToastPieceItemResponses } from '@/types/api/giftToast';

import { formatDate } from '@/utils';

import temp from '../../../public/images/lcm.jpeg';

import clsx from 'clsx';
import Image from 'next/image';

export type PieceBoxProps = {
  handleDelete?: () => void;
  isList?: boolean;
  onClick?: () => void;
  data: ToastPieceItemResponses;
};

export default function PieceBox(props: PieceBoxProps) {
  const { handleDelete, isList = false, onClick, data } = props;
  console.log(data.contentsUrl);

  const [fileContent, setFileContent] = useState<string>('');

  const readFileContent = (blobUrl: string) => {
    fetch(blobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          setFileContent(reader.result as string);
        };
        reader.readAsText(blob);
      })
      .catch((error) => console.error('파일 읽기 오류:', error));
  };

  useEffect(() => {
    readFileContent(data.contentsUrl);
    console.log(fileContent);
  }, [fileContent, data]);

  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col gap-4 py-6 px-5 bg-white rounded-[10px] border border-gray-10"
    >
      <div className="flex gap-4">
        <Image
          src={data.iconImageUrl || temp}
          alt=""
          width={56}
          height={56}
          className="object-cover w-[56px] h-[56px] rounded-[10px]"
        />

        <div className="flex-1 flex-col space-y-2">
          <span className="text-body1 text-gray-80">{data.title}</span>

          <span className="flex gap-1 items-center">
            <Image
              src={data.profileUrl || temp}
              alt=""
              width={24}
              height={24}
              className="object-cover rounded-full w-[24px] h-[24px]"
            />
            <span className="text-gray-80 text-body4">{data.nickname}</span>
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
        dangerouslySetInnerHTML={{ __html: fileContent }}
      />

      {/* images */}
      {data.toastPieceImages && (
        <div className="flex flex-col gap-2">
          <div className="w-full flex gap-1">
            <Image
              src={data.toastPieceImages[0] || temp}
              alt=""
              width={100}
              height={154}
              className="w-1/2 h-[154px] object-cover rounded-[8px] border border-gray-10"
            />
            <div
              className={clsx(
                'w-1/2 h-[154px] relative rounded-[8px] border border-gray-10 overflow-hidden',
                isList ? 'bg-black bg-opacity-60' : '',
              )}
            >
              <Image
                src={data.toastPieceImages[1] || temp}
                alt=""
                width={100}
                height={100}
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
              src={data.toastPieceImages[2] || temp}
              alt=""
              width={100}
              height={154}
              className="w-full h-[154px] object-cover rounded-[8px] border border-gray-10"
            />
          )}
        </div>
      )}
      {/* date */}
      <span className="text-gray-60 text-body4 text-right">
        {data && formatDate(data.createdAt)}
      </span>
    </div>
  );
}
