import { apiRequest } from '.';

// 사용자 잼 아이콘 그룹 목록 조회
export const getIconGroupsJams = async () => {
  const res = await apiRequest(`/api/v1/iconGroups/members/jams`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 사용자 토스트 아이콘 그룹 목록 조회
export const getIconGroupsToasts = async () => {
  const res = await apiRequest(`/api/v1/iconGroups/members/toasts`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 아이콘 그룹 목록 삭제
export const deleteIconGroups = async (iconGroupId: number) => {
  await apiRequest(`/api/v1/iconGroups/${iconGroupId}`, 'DELETE')
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

// 마켓 - 잼 아이콘 그룹 목록 조회
export const getMarketJamIcons = async () => {
  const res = await apiRequest(`/api/v1/iconGroups/jams`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.iconGroupMarketResponses;
};

// 마켓 - 토스트 아이콘 그룹 목록 조회
export const getMarketToastIcons = async () => {
  const res = await apiRequest(`/api/v1/iconGroups/toasts`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.iconGroupMarketResponses;
};

// 아이콘 그룹 상세 조회
export const getIconGroupsDetail = async (iconGroupId: number) => {
  const res = await apiRequest(`/api/v1/iconGroups/${iconGroupId}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 아이콘 그룹 구매하기
export const postBuyIconGroups = async (iconGroupId: number) => {
  await apiRequest(`/api/v1/iconGroups/members/${iconGroupId}`, 'POST')
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
