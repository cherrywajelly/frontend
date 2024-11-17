export interface IconProps {
  iconId: number;
  iconImageUrl: string;
}

export interface IconGroupItemResponse {
  iconGroupId: number;
  name: string;
  icon: IconProps[];
}

export interface IconGroupMarketResponse {
  iconGroupId: number;
  title: string;
  creatorNickname: string;
  iconType: string;
  isBuy: boolean;
  thumbnailImageUrl: string;
}

export interface IconGroupsDetailResponse {
  thumbnailImageUrl: string;
  title: string;
  creatorNickname: string;
  price: number;
  iconResponses: IconProps[];
}
