import { FaRegCalendar } from 'react-icons/fa6';

import Image, { StaticImageData } from 'next/image';

export type ToastBoxProps = {
  title: string;
  profileImg: string | StaticImageData;
  toastImg: string | StaticImageData;
  nickname: string;
  openDate: string;
  children?: React.ReactNode;
};

export default function ToastBox(props: ToastBoxProps) {
  const { toastImg, title, profileImg, nickname, openDate, children } = props;

  return (
    <div className="w-full py-6 px-4 flex flex-col gap-4 bg-white border border-gray-10 rounded-[10px]">
      <div className="flex gap-6">
        <Image
          src={toastImg}
          alt=""
          width={80}
          height={80}
          className="object-cover w-[80px] h-[80px]"
        />

        <div className="flex flex-col gap-1 flex-1">
          <span className="text-gray-80 text-body1">{title}</span>
          <span className="flex gap-1 items-center">
            <Image
              src={profileImg}
              alt="profile"
              width={24}
              height={24}
              className="object-cover rounded-full w-[24px] h-[24px]"
            />
            <span className="text-gray-80 text-body4">
              {nickname === null ? '나에게' : nickname}
            </span>
          </span>
          <span className="flex gap-1 items-center">
            <FaRegCalendar className="text-gray-80" />
            <span className="text-gray-80 text-body4">{openDate}</span>
          </span>
        </div>
      </div>
      <>{children}</>
    </div>
  );
}
