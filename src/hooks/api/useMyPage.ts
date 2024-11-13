import {
  FollowingListResponse,
  GroupListResponse,
  MyProfileResponse,
  MyShowcaseListResponse,
  MyShowcaseResponse,
} from '@/types/api/mypage';

import {
  deleteFollowerUser,
  deleteFollowingUser,
  deleteGroup,
  deleteShowcaseItem,
  getFollowers,
  getFollowings,
  getGroup,
  getMyProfile,
  getMyShowcase,
  getMyShowcaseList,
  postFollowingUser,
  postMyShowcaseList,
} from '@/api/mypage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 마이페이지 - 상단 프로필 정보 조회
export const useGetMyProfile = () => {
  const { data, isLoading, error, refetch } = useQuery<MyProfileResponse>({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};

// 팔로워 목록 조회
export const useGetFollowers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followers'],
    queryFn: () => getFollowers(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

// 팔로잉 목록 조회
export const useGetFollowings = () => {
  const { data, isLoading, error } = useQuery<FollowingListResponse>({
    queryKey: ['followings'],
    queryFn: () => getFollowings(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

// 그룹 목록 조회
export const useGetGroup = () => {
  const { data, isLoading, error } = useQuery<GroupListResponse>({
    queryKey: ['group'],
    queryFn: () => getGroup(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

// 팔로잉 등록
export const usePostFollowingUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (followingId: number) => postFollowingUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['userEventToastList'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 팔로잉 취소
export const useDeleteFollowingUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (followingMemberId: number) =>
      deleteFollowingUser(followingMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['followings'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 팔로워 취소
export const useDeleteFollowerUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (followerMemberId: number) =>
      deleteFollowerUser(followerMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['followings'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 그룹 삭제
export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (teamId: number) => deleteGroup(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 마이페이지 - 진열장 조회
export const useGetMyShowcase = () => {
  const { data, isLoading, error } = useQuery<MyShowcaseResponse[]>({
    queryKey: ['myShowcase'],
    queryFn: () => getMyShowcase(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

//  진열장 목록 조회
export const useGetMyShowcaseList = () => {
  const { data, isLoading, error } = useQuery<MyShowcaseListResponse[]>({
    queryKey: ['myShowcaseList'],
    queryFn: () => getMyShowcaseList(),
  });
  return { data, isLoading, error };
};

// 진열장 등록
export const usePostMyShowcaseList = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (showcases: number[]) => postMyShowcaseList(showcases),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 진열장 삭제
export const useDeleteMyShowcaseItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (showcaseId: number) => deleteShowcaseItem(showcaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myShowcaseList'] });
      queryClient.invalidateQueries({ queryKey: ['myShowcase'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
