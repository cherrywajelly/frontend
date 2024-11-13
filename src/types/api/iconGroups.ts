export interface IconProps {
  iconId: number;
  iconImageUrl: string;
}

export interface IconGroupItemResponse {
  iconGroupId: number;
  name: string;
  icon: IconProps[];
}
