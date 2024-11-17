export interface NotificationsListResponse {
  fcmId: number;
  fcmConstant: string;
  nickname: string;
  text: string;
  imageUrl: string;
  toastName: string;
  isOpened: boolean;
  time: string;
  param: number;
}

export interface NotiItemResponse {
  fcmConstant: string;
  param: number;
}

export interface FCMTestRequestBody {
  fcmConstant: string;
  nickname: string;
  toastName: string;
  param: number;
}
