export interface NotificationsListResponse {
  fcmId: number;
  fcmConstant: string;
  nickname: string;
  text: string;
  imageUrl: string;
  toastName: string;
  isOpened: boolean;
}

export interface NotiItemResponse {
  fcmConstant: string;
  param: number;
}
