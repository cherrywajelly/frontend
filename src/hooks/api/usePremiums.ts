import { PremiumResponse } from '@/types/api/premiums';

import {
  getPremiumsInfo,
  getUserPremiumsAbout,
  postPremiumsInfo,
} from '@/api/premiums';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 프리미엄 정보 조회
export const useGetPremiumsInfo = () => {
  const { data, isLoading, error } = useQuery<PremiumResponse[]>({
    queryKey: ['premiumsInfo'],
    queryFn: () => getPremiumsInfo(),
  });
  return { data, isLoading, error };
};

// 프리미엄 정보 저장
export const usePostBuyIconGroups = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (premiumId: number) => postPremiumsInfo(premiumId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['premiumsInfo'] });
    },
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};

// 사용자 프리미엄 구독 정보 조회
export const useGetUserPremiumsAbout = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userPremiumsAbout'],
    queryFn: () => getUserPremiumsAbout(),
  });
  return { data, isLoading, error };
};
