import { useEffect, useState } from 'react';

import Dropdown from '@/components/common-components/dropdown/Dropdown';

import { JamDataItemResponse } from '@/types/api/eventToast';
import { ToastPieceItemResponses } from '@/types/api/giftToast';

import { formatDate } from '@/utils';

import temp from '../../../public/images/lcm.jpeg';

import clsx from 'clsx';
import Image from 'next/image';

export type JamBoxProps = {
  handleDelete?: () => void;
  onClick?: () => void;
  data: JamDataItemResponse;
};

export default function JamBox(props: JamBoxProps) {
  const { handleDelete, onClick, data } = props;

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
    readFileContent(data.jamContentsUrl);
  }, [fileContent, data]);

  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col gap-4 py-6 px-5 bg-white rounded-[10px] border border-gray-10"
    >
      <div className="flex gap-4">
        <Image
          src={data.jamIconImageUrl}
          alt=""
          width={56}
          height={56}
          unoptimized
          className="object-cover w-[56px] h-[56px] rounded-[10px]"
        />

        <div className="flex-1 flex-col space-y-2">
          <span className="text-body1 text-gray-80">{data.jamTitle}</span>

          <span className="flex gap-1 items-center">
            <Image
              src={data.jamMemberProfileUrl || temp}
              alt=""
              width={24}
              unoptimized
              height={24}
              className="object-cover rounded-full w-[24px] h-[24px]"
            />
            <span className="text-gray-80 text-body4">{data.jamNickname}</span>
          </span>
        </div>

        {handleDelete && (
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
          'whitespace-pre-wrap break-words',
        )}
        dangerouslySetInnerHTML={{ __html: fileContent }}
      />

      {/* image */}
      {data.jamImageUrl && (
        <div className="flex flex-col gap-2">
          <Image
            src={data.jamImageUrl}
            alt=""
            width={100}
            height={100}
            className="w-full object-cover rounded-[8px] border border-gray-10"
          />
        </div>
      )}
      {/* date */}
      <span className="text-gray-60 text-body4 text-right">
        {data && formatDate(data.jamCreatedDate)}
      </span>
    </div>
  );
}
