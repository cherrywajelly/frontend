import { UserListItemProps } from '@/types/user';

import Image from 'next/image';

export default function UserListItem(props: UserListItemProps) {
  const { profileImg, nickname, children, onClick } = props;

  return (
    <div onClick={onClick} className="w-full flex gap-4 items-center">
      <Image
        src={profileImg}
        alt=""
        width={48}
        height={48}
        className="object-cover rounded-full"
      />
      <span className="flex-1 text-body1 text-black-main">{nickname}</span>
      <>{children}</>
    </div>
  );
}
