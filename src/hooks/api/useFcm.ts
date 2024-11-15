import {
  FCMTestRequestBody,
  NotificationsListResponse,
  NotiItemResponse,
} from '@/types/api/fcm';

import {
  getMoveNotificationsPage,
  getNotificationsList,
  postFCMTest,
  putFCMToken,
} from '@/api/fcm';
import { useMutation, useQuery } from '@tanstack/react-query';

// fcm 토큰 저장
export const usePutFCM = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (token: string) => putFCMToken(token),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 알림 목록 조회
export const useGetNotificationsList = () => {
  const { data, isLoading, error, refetch } = useQuery<
    NotificationsListResponse[]
  >({
    queryKey: ['notificationsList'],
    queryFn: () => getNotificationsList(),
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};

// 알림 관련 페이지로 이동
export const useGetMoveNotificationsPage = (fcmId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['moveNotificationsPage'],
    queryFn: () => getMoveNotificationsPage(fcmId),
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};

// 알림 테스트
export const usePostFCMTest = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: FCMTestRequestBody) => postFCMTest(item),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
