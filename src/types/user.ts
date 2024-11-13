import { StaticImageData } from 'next/image';

export interface UserDefaultProps {
  profileImg: string | null;
  nickname: string;
  memberId?: number;
}

export interface UserListItemProps extends UserDefaultProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
