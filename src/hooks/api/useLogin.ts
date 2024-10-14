import { getGoogleLogin, getKakaoToken } from '@/api/login';
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
