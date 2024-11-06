import {
  deleteGiftToast,
  getGiftToastIncompleted,
  getGiftToastItem,
  getGiftToastList,
  postGiftToastFriend,
  postGiftToastGroup,
  postGiftToastMine,
} from '@/api/giftToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 작성해야 할 선물 받은 토스트 목록 조회
export const useGetToastIncompleted = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['giftToastIncompleted'],
    queryFn: () => getGiftToastIncompleted(),
  });
  return { data, isLoading, error };
};

// 개인 선물 토스트 목록 조회
export const useGetGiftToastList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['giftToastList'],
    queryFn: () => getGiftToastList(),
  });
  return { data, isLoading, error };
};

// 선물 토스트 단일 조회
export const useGetGiftToastItem = (giftToastId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getGiftToastItem'],
    queryFn: () => getGiftToastItem(giftToastId),
  });
  return { data, isLoading, error };
};

// 선물 토스트 등록 (그룹)
export const usePostGiftToastGroup = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => postGiftToastGroup(),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 선물 토스트 등록 (팔로잉)
export const usePostGiftToastFriend = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => postGiftToastFriend(),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 선물 토스트 등록 (자신)
export const usePostGiftToastMine = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => postGiftToastMine(),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 선물 토스트 삭제
export const useDeleteGiftToast = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (giftToastId: number) => deleteGiftToast(giftToastId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giftToastList'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
