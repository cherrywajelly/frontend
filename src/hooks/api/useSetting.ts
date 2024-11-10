import { RequestGroupTeam } from '@/types/api/setting';

import { postGroupTeam } from '@/api/setting';
import { useMutation } from '@tanstack/react-query';

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
