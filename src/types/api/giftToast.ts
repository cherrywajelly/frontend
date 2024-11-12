export interface GiftToastDefaultResponse {
  giftToastId: number;
  title: string;
  iconImageUrl: string;
}

export interface GiftToastItemResponse extends GiftToastDefaultResponse {
  giftToastType: string;
  giftToastOwner: string;
  isOpened: boolean;
}

// 선물토스트 - 토스트조각 리스트
export interface ToastPieceResponses {
  giftToastId: number;
  toastPieceResponses: ToastPieceItemResponses[];
}

// 선물토스트 - 토스트조각 아이템
export interface ToastPieceItemResponses {
  memberId: number;
  nickname: string;
  profileUrl: string;
  iconId: number;
  title: string;
  contentsUrl: string;
  createdDate: string;
  toastPieceImages: string[];
}

// 선물토스트 - 조회 response
export interface GiftToastResponses extends GiftToastItemResponse {
  memorizedDate: string;
  openedDate: string;
  createdDate: string;
  dDay: number;
  toastPieceResponses: ToastPieceResponses;
}

// 선물 토스트 등록 (그룹)
export interface GiftToastRequestBody {
  iconId: number;
  memorizedDate: string;
  openedDate: string;
  title: string;
}

export interface GiftToastGroupRequestBody extends GiftToastRequestBody {
  groupId: number;
}

export interface GiftToastFriendRequestBody extends GiftToastRequestBody {
  friendId: number;
}

// 토스트 조각 관련 타입
export interface GiftToastPiecePostRequestBody {
  toastPieceContents: File;
  toastPieceImages: File[];
  toastPieceRequest: {
    giftToastId: number;
    iconId: number;
    title: string;
  };
}
