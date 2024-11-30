export interface EventToastDefaultResponse {
  eventToastId: number;
  title: string;
  openedDate: string;
  memberProfileUrl: string;
  nickname: string;
  isWritten?: boolean;
}

export interface EventToastItemResponse extends EventToastDefaultResponse {
  isWritten?: boolean;
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

export interface EventToastPostResponse {
  id: number;
  statusCode: string;
  message: string;
}

export interface JamItemResponse {
  jamId: number;
  iconImageUrl: string;
  nickname: string;
}
export interface EventToastResponse extends EventToastDefaultResponse {
  jamCount: number;
  dDay: number;
  jams: JamItemResponse[] | null;
  iconImageUrl: string;
  isOpened: boolean;
  memberId: number;
}

export interface JamDataItemResponse {
  jamIconImageUrl: string;
  jamTitle: string;
  jamMemberProfileUrl: string;
  jamNickname: string;
  jamContentsUrl: string;
  jamImageUrl: string;
  jamCreatedDate: string;
}

export interface JamItemDetailResponse {
  eventToastDataResponse: {
    eventToastTitle: string;
    eventToastMemberProfile: string;
    eventToastNickname: string;
    eventToastIconImageUrl: string;
  };
  jamDataResponse: JamDataItemResponse;
}

// 잼 타입 관련
export interface jamPostRequestBody {
  jamContents: File;
  jamImages?: File;
  jamRequest: {
    iconId: number;
    title: string;
  };
}

// 공유 템플릿 관련
export interface EventToastShareTemplateResponse {
  eventToastTemplateResponse: {
    title: string;
    openedDate: string;
  };
  iconImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  text: string;
}
