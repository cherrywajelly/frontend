export interface EventToastDefaultResponse {
  eventToastId: number;
  title: string;
  openedDate: string;
  memberProfileUrl: string;
  nickname: string;
}

export interface EventToastItemResponse extends EventToastDefaultResponse {
  postedJam?: boolean;
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

export interface JamItemResponse {
  jamId: number;
  iconImageUrl: number;
  nickname: string;
}
export interface EventToastResponse extends EventToastDefaultResponse {
  jamCount: number;
  dDay: number;
  jams: JamItemResponse[] | null;
  iconImageUrl: string;
  isOpened: boolean;
}