import { RequestGroupTeam } from '@/types/api/setting';

import { postGroupTeam, postProfileImage } from '@/api/setting';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 그룹 등록
export const useGroupTeam = ({ teamName, teamMembers }: RequestGroupTeam) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      postGroupTeam({
        teamName,
        teamMembers,
      }),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
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
