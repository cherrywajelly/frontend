import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosMore } from 'react-icons/io';

import { MyGiftToastItemProps } from '@/types/mypage';

import Image from 'next/image';

export default function MyGiftToastItem(props: MyGiftToastItemProps) {
  const { image, title, groupUser } = props;

  return (
    <div className="flex gap-4 py-2 bg-white">
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
          <HiMiniUserGroup className="text-gray-80" />
          <span className="text-gray-80 text-body4">{`${groupUser[0]}님 외 ${groupUser.length - 1}명`}</span>
        </span>
      </div>

      <IoIosMore size={24} className="text-gray-20" />
    </div>
  );
}
