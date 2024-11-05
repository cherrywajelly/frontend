import {
  deleteEventToast,
  getEventToastItem,
  getEventToastList,
  getFollowingUserEventToast,
  getUserEventToastList,
  postEventToast,
} from '@/api/eventToast';
import { useMutation, useQuery } from '@tanstack/react-query';

// 개인 이벤트 토스트 목록 조회
export const useGetEventToastList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['eventToastList'],
    queryFn: () => getEventToastList(),
  });
  return { data, isLoading, error };
};

// 특정 사용자의 이벤트 토스트 목록 조회
export const useGetUserEventToastList = (memberId: number) => {
  const { data, isLoading, error } = useQuery({
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
  const { data, isLoading, error } = useQuery({
    queryKey: ['followingUserEventToast'],
    queryFn: () => getFollowingUserEventToast(),
  });
  return { data, isLoading, error };
};

// 이벤트 토스트 등록
/* req body
{
    "opened_date": "2025-01-03",
    "title": "내 생일 ~",
    "icon_id": 1
}
*/ export const usePostEventToast = (item: any) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => postEventToast(item),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 이벤트 토스트 삭제
export const useDeleteEventToast = (eventToastId: number) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => deleteEventToast(eventToastId),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
