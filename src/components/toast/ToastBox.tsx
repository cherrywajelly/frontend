import { FaRegCalendar } from 'react-icons/fa6';

import Image from 'next/image';

export type ToastBoxProps = {
  toastImg: string;
  title: string;
  profileImg: string;
  nickname: string;
  openDate: string;
};

export default function ToastBox(props: ToastBoxProps) {
  const { toastImg, title, profileImg, nickname, openDate } = props;

  return (
    <div className="w-full py-6 px-4 bg-white border border-gray-10 rounded-[10px] flex gap-6">
      <Image
        src={toastImg}
        alt=""
        width={80}
        height={80}
        className="object-cover"
      />

      <div className="flex flex-col gap-1 flex-1">
        <span className="text-gray-80 text-body1">{title}</span>
        <span className="flex gap-1 items-center">
          <Image
            src={profileImg}
            alt="profile"
            width={24}
            height={24}
            className="object-cover rounded-full"
          />
          <span className="text-gray-80 text-body4">{nickname}</span>
        </span>
        <span className="flex gap-1 items-center">
          <FaRegCalendar className="text-gray-80" />
          <span className="text-gray-80 text-body4">{openDate}</span>
        </span>
      </div>
    </div>
  );
}
