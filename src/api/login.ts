import { apiRequest } from '.';

// kakao - 사용자 로그인/회원가입 요청
export const getKakaoToken = async (code: string) => {
  const res = await apiRequest(`/api/v1/login/kakao?code=${code}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Kakao! Status: ${res.status}`);
  }

  // 로그인
  if (res.headers) {
    let jwtToken = res.headers.get('Authorization');
    jwtToken = jwtToken?.split(' ')[1] || '';

    if (jwtToken) {
      sessionStorage.setItem('accessToken', jwtToken);
      return null;
    }
  }

  const data = await res.json();

  return data;
};

// google - 사용자 로그인/회원가입 요청
export const getGoogleLogin = async (code: string) => {
  const res = await apiRequest(`/api/v1/login/google?code=${code}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
