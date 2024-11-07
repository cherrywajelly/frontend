import {
  EventToastItemResponse,
  EventToastPostReqBody,
} from '@/types/api/eventToast';

import {
  deleteEventToast,
  getEventToastItem,
  getEventToastList,
  getFollowingUserEventToast,
  getUserEventToastList,
  postEventToast,
} from '@/api/eventToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 개인 이벤트 토스트 목록 조회
export const useGetEventToastList = () => {
  const { data, isLoading, error } = useQuery<EventToastItemResponse[]>({
    queryKey: ['eventToastList'],
    queryFn: () => getEventToastList(),
  });
  return { data, isLoading, error };
};

// 특정 사용자의 이벤트 토스트 목록 조회
export const useGetUserEventToastList = (memberId: number) => {
  const { data, isLoading, error } = useQuery<EventToastItemResponse[]>({
    queryKey: ['userEventToastList'],
    queryFn: () => getUserEventToastList(memberId),
  });
  return { data, isLoading, error };
};

// 사용자 이벤트 토스트 상세 조회
export const useGetEventToastItem = (eventToastId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['eventToastItem'],
    queryFn: () => getEventToastItem(eventToastId),
  });
  return { data, isLoading, error };
};

// 사용자가 팔로우 하고 있는 타사용자의 이벤트 토스트 목록 조회
export const useGetFollowingUserEventToast = () => {
  const { data, isLoading, error } = useQuery<EventToastItemResponse[]>({
    queryKey: ['followingUserEventToast'],
    queryFn: () => getFollowingUserEventToast(),
  });
  return { data, isLoading, error };
};

// 이벤트 토스트 등록
export const usePostEventToast = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: EventToastPostReqBody) => postEventToast(item),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 이벤트 토스트 삭제
export const useDeleteEventToast = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (eventToastId: number) => deleteEventToast(eventToastId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventToastList'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
