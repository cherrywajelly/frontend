import { getNicknameValid, putNicknameSignUp } from '@/api/signup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useNicknameValid = (nickname: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['nicknameValid'],
    queryFn: () => getNicknameValid(nickname),
    enabled: false,
  });

  return { data, error, isLoading, refetch };
};

export const useNicknameSignUp = (nickname: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => putNicknameSignUp(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};
