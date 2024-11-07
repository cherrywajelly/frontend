import { StaticImageData } from 'next/image';

export type UserInfoProps = {
  nickname: string;
  profileImg: string | StaticImageData;
  follower: number;
  following: number;
  group: number;
  children?: React.ReactNode;
};

// showcase props
export type ShowcaseProps = {
  isMine: boolean;
  nickname?: string;
};

export type MyEventToastItemProps = {
  image: string | StaticImageData;
  title: string;
  date: string;
  isSetting?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  handleDelete?: () => void;
};

export type MyGiftToastItemProps = {
  image: string | StaticImageData;
  title: string;
  groupUser: string;
  handleDelete: () => void;
};

export type UserProfilePageProps = {
  eventToastData: UserInfoProps[];
  nickname: string;
};
