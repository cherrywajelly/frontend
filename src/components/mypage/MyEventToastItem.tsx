import { FaRegCalendar } from 'react-icons/fa6';

import { MyEventToastItemProps } from '@/types/mypage';

import Dropdown from '../common-components/dropdown';

import Image from 'next/image';

export default function MyEventToastItem(props: MyEventToastItemProps) {
  const {
    image,
    title,
    date,
    isSetting = true,
    children,
    onClick,
    handleDelete,
  } = props;

  return (
    <div className="flex gap-4 py-2 bg-white" onClick={onClick}>
      <Image
        src={image}
        alt=""
        width={56}
        height={56}
        className="object-cover"
      />

      <div className="flex-1 flex-col space-y-2">
        <span className="text-body1 text-gray-80">{title}</span>

        <span className="flex gap-1 items-center">
          <FaRegCalendar className="text-gray-80" />
          <span className="text-gray-80 text-body4">{date}</span>
        </span>
      </div>

      {isSetting && handleDelete && (
        <Dropdown
          items={[{ label: '삭제하기', onClick: handleDelete }]}
          size="sm"
        />
      )}

      {children}
    </div>
  );
}
