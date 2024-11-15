import { NotificationsListResponse } from '@/types/api/fcm';

import temp from '../../../public/images/lcm.jpeg';

import clsx from 'clsx';
import Image from 'next/image';

export type NotiDefaultItem = {
  fcmConstant: string;
  fcmId: number;
  imageUrl: string;
  nickname: string;
  text: string;
  time: string;
  toastName: string;
};

export default function NotiDefaultItem({
  item,
  className,
  onClick,
}: {
  item: NotificationsListResponse;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={clsx(
        'w-full border-b border-gray-10 py-5 px-6 flex items-center gap-4',
        className,
      )}
      onClick={onClick}
    >
      <Image
        src={item.imageUrl ?? temp}
        width={64}
        height={64}
        alt=""
        className="w-[64px] h-[64px] object-cover rounded-[10px]"
      />

      <div className="flex flex-1 flex-col">
        <span className="text-black-main text-body2">{item.text}</span>

        <span className="mt-1 flex gap-[6px] items-center text-gray-60 text-body4">
          <span>{item.toastName}</span>
          <span>·</span>
          <span>{item.time}</span>
        </span>
      </div>
    </div>
  );
}
