import { apiRequest } from '.';

// 프리미엄 정보 조회
export const getPremiumsInfo = async () => {
  const res = await apiRequest(`/api/v1/premiums`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.premiumResponses;
};

// 프리미엄 정보 저장
export const postPremiumsInfo = async (premiumId: number) => {
  await apiRequest(`/api/v1/premiums/${premiumId}`, 'POST')
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

// 사용자 프리미엄 구독 정보 조회
export const getUserPremiumsAbout = async () => {
  const res = await apiRequest(`/api/v1/members/premiums`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
