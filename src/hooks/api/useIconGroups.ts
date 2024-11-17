import {
  IconGroupItemResponse,
  IconGroupMarketResponse,
  IconGroupsDetailResponse,
} from '@/types/api/iconGroups';

import {
  deleteIconGroups,
  getIconGroupsDetail,
  getIconGroupsJams,
  getIconGroupsToasts,
  getMarketJamIcons,
  getMarketToastIcons,
  postBuyIconGroups,
} from '@/api/iconGroups';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 사용자 잼 아이콘 그룹 목록 조회
export const useGetIconGroupsJams = () => {
  const { data, isLoading, error, refetch } = useQuery<IconGroupItemResponse[]>(
    {
      queryKey: ['iconGroupsJams'],
      queryFn: () => getIconGroupsJams(),
      enabled: true,
    },
  );
  return { data, isLoading, error, refetch };
};

// 사용자 토스트 아이콘 그룹 목록 조회
export const useGetIconGroupsToasts = () => {
  const { data, isLoading, error, refetch } = useQuery<IconGroupItemResponse[]>(
    {
      queryKey: ['iconGroupsToasts'],
      queryFn: () => getIconGroupsToasts(),
      enabled: true,
    },
  );
  return { data, isLoading, error, refetch };
};

// 아이콘 그룹 목록 삭제
export const useDeleteGiftToast = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (iconGroupId: number) => deleteIconGroups(iconGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iconGroups'] });
    },
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};

// 마켓 - 잼 아이콘 그룹 목록 조회
export const useGetMarketJamIcons = () => {
  const { data, isLoading, error } = useQuery<IconGroupMarketResponse[]>({
    queryKey: ['marketJamIcons'],
    queryFn: () => getMarketJamIcons(),
  });
  return { data, isLoading, error };
};

// 마켓 - 토스트 아이콘 그룹 목록 조회
export const useGetMarketToastIcons = () => {
  const { data, isLoading, error } = useQuery<IconGroupMarketResponse[]>({
    queryKey: ['marketToastIcons'],
    queryFn: () => getMarketToastIcons(),
  });
  return { data, isLoading, error };
};

// 아이콘 그룹 상세 조회
export const useGetIconGroupsDetail = (iconGroupId: number) => {
  const { data, isLoading, error } = useQuery<IconGroupsDetailResponse>({
    queryKey: ['iconGroupsDetail'],
    queryFn: () => getIconGroupsDetail(iconGroupId),
  });
  return { data, isLoading, error };
};

// 아이콘 그룹 구매하기
export const usePostBuyIconGroups = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (iconGroupId: number) => postBuyIconGroups(iconGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iconGroupsJams'] });
      queryClient.invalidateQueries({ queryKey: ['iconGroupsToasts'] });
    },
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};
