export interface EventToastItemResponse {
  eventToastId: number;
  title: string;
  openedDate: string;
  nickname: string;
  postedJam?: boolean;
  memberProfileUrl: string;
  icon: {
    iconId: number;
    iconImageUrl: string;
  };
}

export interface EventToastPostReqBody {
  openedDate: string;
  title: string;
  iconId: number;
}
