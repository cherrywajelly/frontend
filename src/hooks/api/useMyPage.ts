import {
  deleteFollowerUser,
  deleteFollowingUser,
  deleteGroup,
  getFollowers,
  getFollowings,
  getGroup,
  postFollowingUser,
} from '@/api/mypage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { error } from 'console';

export const useGetFollowers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followers'],
    queryFn: () => getFollowers(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

export const useGetFollowings = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followings'],
    queryFn: () => getFollowings(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

export const useGetGroup = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['group'],
    queryFn: () => getGroup(),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

export const usePostFollowingUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (followingId: number) => postFollowingUser(followingId),
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

export const useDeleteGroup = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (teamId: number) => deleteGroup(teamId),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
