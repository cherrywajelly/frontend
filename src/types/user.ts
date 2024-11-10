import { StaticImageData } from 'next/image';

export interface UserDefaultProps {
  profileImg: string | StaticImageData;
  nickname: string;
  memberId?: number;
}

export interface UserListItemProps extends UserDefaultProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
