import { MyInfoResponse } from '@/types/api/login';

import { getGoogleLogin, getKakaoToken, getMyInfo } from '@/api/login';
import { useQuery } from '@tanstack/react-query';

export const useKakaoToken = (kakaoCode: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['KAKAO_CODE', kakaoCode],
    queryFn: () => getKakaoToken(kakaoCode),
    enabled: !!kakaoCode,
  });
  return { data, isLoading, error };
};

export const useGoogleLogin = (googleCode: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['googleLogin', googleCode],
    queryFn: () => getGoogleLogin(googleCode),
    enabled: !!googleCode,
  });

  return { data, error, isLoading };
};

// 사용자 정보(닉네임, 프로필 이미지) 조회
export const useMyInfo = () => {
  const { data, error, isLoading, refetch } = useQuery<MyInfoResponse>({
    queryKey: ['myInfo'],
    queryFn: () => getMyInfo(),
    enabled: true,
  });

  return { data, error, isLoading, refetch };
};
