import { FCMTestRequestBody } from '@/types/api/fcm';

import { apiRequest } from '.';

// fcm 토큰 저장
export const putFCMToken = async (token: string) => {
  await apiRequest(`/api/v1/fcm?token=${token}`, 'PUT')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// 알림 목록 조회
export const getNotificationsList = async () => {
  const res = await apiRequest(`/api/v1/fcm`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 알림 관련 페이지로 이동
export const getMoveNotificationsPage = async (fcmId: number) => {
  const res = await apiRequest(`/api/v1/fcm/opened/${fcmId}`);

  if (!res.ok) {
    throw new Error(`status: ${res.status}`);
  }

  const data = await res.json();
  return data.fcmResponses;
};

// 알림 테스트
export const postFCMTest = async ({
  fcmConstant,
  nickname,
  toastName,
  param,
}: FCMTestRequestBody) => {
  await apiRequest(`/api/v1/fcm/send`, 'POST', {
    fcmConstant,
    nickname,
    toastName,
    param,
  })
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};
