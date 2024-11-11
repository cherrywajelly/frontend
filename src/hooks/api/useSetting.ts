import { RequestGroupTeam } from '@/types/api/setting';

import {
  postGroupTeam,
  postGroupTeamImage,
  postProfileImage,
} from '@/api/setting';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 그룹 등록
export const useGroupTeam = ({ teamName, teamMembers }: RequestGroupTeam) => {
  const { mutate, isPending, error, data, mutateAsync } = useMutation({
    mutationFn: () =>
      postGroupTeam({
        teamName,
        teamMembers,
      }),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error, data, mutateAsync };
};

// 프로필 이미지 등록
export const usePostProfileImage = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (profileImage: File) => postProfileImage(profileImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

// 그룹 이미지 등록
export const usePostGroupImage = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ teamId, teamImage }: { teamId: number; teamImage: File }) =>
      postGroupTeamImage(teamId, teamImage),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [''] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
