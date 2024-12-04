import { MyInfoResponse } from './login';

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

export interface ToastPieceResponse {
  giftToastInfo: GiftToastInfoResponse;
  toastPieceResponse: ToastPieceItemResponses;
}

// 선물토스트 - 토스트조각 아이템
export interface ToastPieceItemResponses {
  toastPieceId: number;
  memberId: number;
  nickname: string;
  profileUrl: string;
  iconImageUrl: string;
  title: string;
  contentsUrl: string;
  createdAt: string;
  toastPieceImages: string[];
}

export interface GiftToastInfoResponse extends GiftToastItemResponse {
  memorizedDate: string;
  openedDate: string;
  createdDate: string;
  profileImageUrl: string;
  description: string;
}

export interface GiftToastTeamMemberResponse {
  teamMembersCount: number;
  isWrittenCount: number;
  isWrittenMembers: MyInfoResponse[];
}

// 선물토스트 - 조회 response
export interface GiftToastResponses {
  dDay: number;
  giftToastInfo: GiftToastInfoResponse;
  toastPieceResponses: ToastPieceResponses;
  giftToastTeamMember: GiftToastTeamMemberResponse | null;
}

// 선물 토스트 등록 (그룹)
export interface GiftToastRequestBody {
  iconId: number;
  memorizedDate: string;
  openedDate: string;
  title: string;
  description: string;
}

export interface GiftToastGroupRequestBody extends GiftToastRequestBody {
  teamId: number;
}

export interface GiftToastFriendRequestBody extends GiftToastRequestBody {
  friendId: number;
}

// 토스트 조각 관련 타입
export interface GiftToastPiecePostRequestBody {
  toastPieceContents: File;
  toastPieceImages?: File[];
  toastPieceRequest: {
    giftToastId: number;
    iconId: number;
    title: string;
  };
}
