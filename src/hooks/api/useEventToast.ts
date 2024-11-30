import {
  EventToastItemResponse,
  EventToastPostReqBody,
  EventToastPostResponse,
  EventToastResponse,
  EventToastShareTemplateResponse,
  JamItemDetailResponse,
  JamItemResponse,
  jamPostRequestBody,
} from '@/types/api/eventToast';

import {
  deleteEventToast,
  deleteJamItem,
  getEventToastItem,
  getEventToastList,
  getEventToastShareTemplate,
  getFollowingUserEventToast,
  getJamDetail,
  getJamList,
  getUserEventToastList,
  postEventToast,
  postEventToastShareTemplateContent,
  postJamItemToEventToast,
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
  const { data, isLoading, error, refetch } = useQuery<
    EventToastItemResponse[]
  >({
    queryKey: ['userEventToastList'],
    queryFn: () => getUserEventToastList(memberId),
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};

// 사용자 이벤트 토스트 상세 조회
export const useGetEventToastItem = (eventToastId: number) => {
  const { data, isLoading, error } = useQuery<EventToastResponse>({
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
  const { mutate, isPending, error } = useMutation<
    EventToastPostResponse,
    Error,
    EventToastPostReqBody
  >({
    mutationFn: (item: EventToastPostReqBody) => postEventToast(item),
    onSuccess: (data) => {},
    onError: (error) => {
      // console.log(error);
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
      // console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 잼 목록 조회
export const useGetJamList = (eventToastId: number) => {
  const { data, isLoading, error, refetch } = useQuery<JamItemResponse[]>({
    queryKey: ['jamList'],
    queryFn: () => getJamList(eventToastId),
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};

// 잼 상세 조회
export const useGetJamDetail = (jamId: number) => {
  const { data, isLoading, error, refetch } = useQuery<JamItemDetailResponse>({
    queryKey: ['jamDetail'],
    queryFn: () => getJamDetail(jamId),
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};

// 잼 삭제
export const useDeleteJamItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (jamId: number) => deleteJamItem(jamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jamList'] });
    },
    onError: (error) => {
      // console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 잼 저장
export const usePostJamItemToEventToast = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      eventToastId,
      item,
    }: {
      eventToastId: number;
      item: jamPostRequestBody;
    }) => postJamItemToEventToast(eventToastId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jamList'] });
    },
    onError: (error) => {
      // console.error(error);
    },
  });

  return { mutate, isPending, error };
};

// 이벤트 토스트 공유 템플릿 조회
export const useGetEventToastShareTemplate = (eventToastId: number) => {
  const { data, isLoading, error, refetch } =
    useQuery<EventToastShareTemplateResponse>({
      queryKey: ['shareTemplate'],
      queryFn: () => getEventToastShareTemplate(eventToastId),
    });
  return { data, isLoading, error, refetch };
};

// 이벤트 토스트 공유 템플릿 내용 저장
export const usePostEventToastShareTemplateContent = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      eventToastId,
      text,
    }: {
      eventToastId: number;
      text: string;
    }) => postEventToastShareTemplateContent({ eventToastId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareTemplate'] });
    },
    onError: (error) => {
      // console.error(error);
    },
  });

  return { mutate, isPending, error };
};
