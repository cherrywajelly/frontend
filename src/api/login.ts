import { apiRequest } from '.';

// kakao - 사용자 로그인/회원가입 요청
export const getKakaoToken = async (code: string) => {
  const res = await apiRequest(`/api/v1/login/kakao?code=${code}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Kakao! Status: ${res.status}`);
  }

  const data = await res.json();

  return data;
};

// google - 사용자 로그인/회원가입 요청
export const getGoogleLogin = async (code: string) => {
  const res = await apiRequest(`/api/v1/login/google?code=${code}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 사용자 프로필(닉네임, 프로필 이미지) 조회
export const getMyInfo = async () => {
  const res = await apiRequest(`/api/v1/members/info`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
