import {
  deleteFollowerUser,
  deleteFollowingUser,
  getFollowers,
  getFollowings,
  getGroup,
  postFollowingUser,
} from '@/api/mypage';
import { useMutation, useQuery } from '@tanstack/react-query';

import { error } from 'console';

export const useGetFollowers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followers'],
    queryFn: () => getFollowers(),
  });
  return { data, isLoading, error };
};

export const useGetFollowings = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followings'],
    queryFn: () => getFollowings(),
  });
  return { data, isLoading, error };
};

export const useGetGroup = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['group'],
    queryFn: () => getGroup(),
  });
  return { data, isLoading, error };
};

export const usePostFollowingUser = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (followingId: number) => postFollowingUser(followingId),
    onSuccess: () => {
      console.log('팔로잉 등록');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

export const useDeleteFollowingUser = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (followingMemberId: number) =>
      deleteFollowingUser(followingMemberId),
    onSuccess: () => {
      console.log('팔로잉 취소');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

export const useDeleteFollowerUser = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (followerMemberId: number) =>
      deleteFollowerUser(followerMemberId),
    onSuccess: () => {
      console.log('팔로워 취소');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
