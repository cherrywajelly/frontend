import {
  GiftToastDefaultResponse,
  GiftToastFriendRequestBody,
  GiftToastGroupRequestBody,
  GiftToastItemResponse,
  GiftToastPiecePostRequestBody,
  GiftToastRequestBody,
  GiftToastResponses,
  ToastPieceResponse,
} from '@/types/api/giftToast';

import {
  deleteGiftToast,
  deleteToastPiece,
  getGiftToastIncompleted,
  getGiftToastItem,
  getGiftToastList,
  getToastPieceItem,
  postGiftToastFriend,
  postGiftToastGroup,
  postGiftToastMine,
  postToastPieces,
} from '@/api/giftToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 작성해야 할 선물 받은 토스트 목록 조회
export const useGetToastIncompleted = () => {
  const { data, isLoading, error } = useQuery<GiftToastDefaultResponse[]>({
    queryKey: ['giftToastIncompleted'],
    queryFn: () => getGiftToastIncompleted(),
  });
  return { data, isLoading, error };
};

// 개인 선물 토스트 목록 조회
export const useGetGiftToastList = () => {
  const { data, isLoading, error } = useQuery<GiftToastItemResponse[]>({
    queryKey: ['giftToastList'],
    queryFn: () => getGiftToastList(),
  });
  return { data, isLoading, error };
};

// 선물 토스트 단일 조회
export const useGetGiftToastItem = (giftToastId: number) => {
  const { data, isLoading, error } = useQuery<GiftToastResponses>({
    queryKey: ['getGiftToastItem'],
    queryFn: () => getGiftToastItem(giftToastId),
  });
  return { data, isLoading, error };
};

// 선물 토스트 등록 (그룹)
export const usePostGiftToastGroup = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: GiftToastGroupRequestBody) => postGiftToastGroup(item),
    onSuccess: () => {},
    onError: (error) => {
      // console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 선물 토스트 등록 (팔로잉)
export const usePostGiftToastFriend = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: GiftToastFriendRequestBody) => postGiftToastFriend(item),
    onSuccess: () => {},
    onError: (error) => {
      // console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 선물 토스트 등록 (자신)
export const usePostGiftToastMine = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: GiftToastRequestBody) => postGiftToastMine(item),
    onSuccess: () => {},
    onError: (error) => {
      // console.log(error);
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
      // console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 토스트 조각 등록
export const usePostToastPieces = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: GiftToastPiecePostRequestBody) => postToastPieces(item),
    onSuccess: () => {},
    onError: (error) => {
      // console.error(error);
    },
  });

  return { mutate, isPending, error };
};

// 토스트 조각 단일 조회
export const useGetToastPieceItem = (toastPieceId: number) => {
  const { data, isLoading, error } = useQuery<ToastPieceResponse>({
    queryKey: ['toastPieceItem'],
    queryFn: () => getToastPieceItem(toastPieceId),
  });
  return { data, isLoading, error };
};

// 토스트 조각 삭제
export const useDeleteToastPiece = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (toastPieceId: number) => deleteToastPiece(toastPieceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giftToastList'] });
    },
    onError: (error) => {
      // console.log(error);
    },
  });
  return { mutate, isPending, error };
};
