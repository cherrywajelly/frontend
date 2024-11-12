import {
  GiftToastFriendRequestBody,
  GiftToastGroupRequestBody,
  GiftToastRequestBody,
} from '@/types/api/giftToast';

import { apiRequest } from '.';

// 작성해야 할 선물 받은 토스트 목록 조회
export const getGiftToastIncompleted = async () => {
  const res = await apiRequest(`/api/v1/giftToasts/members/incomplete`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }
  const data = await res.json();
  return data.giftToastResponses;
};

// 개인 선물 토스트 목록 조회
export const getGiftToastList = async () => {
  const res = await apiRequest(`/api/v1/giftToasts/members`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.giftToastResponses;
};

// 선물 토스트 단일 조회
export const getGiftToastItem = async (giftToastId: number) => {
  const res = await apiRequest(`/api/v1/giftToasts/${giftToastId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 선물 토스트 등록 (그룹)
export const postGiftToastGroup = async ({
  iconId,
  memorizedDate,
  openedDate,
  title,
  groupId,
}: GiftToastGroupRequestBody) => {
  await apiRequest(`/api/v1/giftToasts/group`, 'POST', {
    iconId,
    memorizedDate,
    openedDate,
    title,
    groupId,
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
      console.log(err);
    });
};

// 선물 토스트 등록 (팔로잉)
export const postGiftToastFriend = async ({
  iconId,
  memorizedDate,
  openedDate,
  title,
  friendId,
}: GiftToastFriendRequestBody) => {
  await apiRequest(`/api/v1/giftToasts/friend`, 'POST', {
    iconId,
    memorizedDate,
    openedDate,
    title,
    friendId,
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
      console.log(err);
    });
};

// 선물 토스트 등록 (자신)
export const postGiftToastMine = async ({
  iconId,
  memorizedDate,
  openedDate,
  title,
}: GiftToastRequestBody) => {
  await apiRequest(`/api/v1/giftToasts/mine`, 'POST', {
    iconId,
    memorizedDate,
    openedDate,
    title,
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
      console.log(err);
    });
};

// 선물 토스트 삭제
export const deleteGiftToast = async (giftToastId: number) => {
  await apiRequest(`/api/v1/giftToasts/${giftToastId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
