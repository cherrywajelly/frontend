import {
  EventToastPostReqBody,
  jamPostRequestBody,
} from '@/types/api/eventToast';

import { apiRequest } from '.';

// 개인 이벤트 토스트 목록 조회
export const getEventToastList = async () => {
  const res = await apiRequest(`/api/v1/eventToasts/member`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 특정 사용자의 이벤트 토스트 목록 조회
export const getUserEventToastList = async (memberId: number) => {
  const res = await apiRequest(`/api/v1/eventToasts/member/${memberId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 사용자 이벤트 토스트 상세 조회
export const getEventToastItem = async (eventToastId: number) => {
  const res = await apiRequest(`/api/v1/eventToasts/${eventToastId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 사용자가 팔로우 하고 있는 타사용자의 이벤트 토스트 목록 조회
export const getFollowingUserEventToast = async () => {
  const res = await apiRequest(`/api/v1/eventToasts/follow/following`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 이벤트 토스트 등록
export const postEventToast = async ({
  iconId,
  title,
  openedDate,
}: EventToastPostReqBody) => {
  await apiRequest(`/api/v1/eventToasts`, 'POST', {
    iconId,
    title,
    openedDate,
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
      throw err;
    });
};

// 이벤트 토스트 삭제
export const deleteEventToast = async (eventToastId: number) => {
  await apiRequest(`/api/v1/eventToasts/${eventToastId}`, 'DELETE')
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
      throw err;
    });
};

// 잼 목록 조회
export const getJamList = async (eventToastId: number) => {
  const res = await apiRequest(`/api/v1/jams/eventToast/${eventToastId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 잼 상세 조회
export const getJamDetail = async (jamId: number) => {
  const res = await apiRequest(`/api/v1/jams/${jamId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 잼 삭제
export const deleteJamItem = async (jamId: number) => {
  await apiRequest(`/api/v1/jams/${jamId}`, 'DELETE')
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
      throw err;
    });
};

// 잼 저장
export const postJamItemToEventToast = async (
  eventToastId: number,
  { jamContents, jamImages, jamRequest }: jamPostRequestBody,
) => {
  const formData = new FormData();

  formData.append('jamContents', jamContents);
  if (jamImages) formData.append('jamImages', jamImages);

  const requestBlob = new Blob([JSON.stringify(jamRequest)], {
    type: 'application/json',
  });

  formData.append('jamRequest', requestBlob);

  await apiRequest(`/api/v1/jams/${eventToastId}`, 'POST', formData)
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
      throw err;
    });
};
