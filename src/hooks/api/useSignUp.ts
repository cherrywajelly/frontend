import { postNicknameValid, putNicknameSignUp } from '@/api/signup';
import { useMutation } from '@tanstack/react-query';

export const useNicknameValid = (nickname: string) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => postNicknameValid(nickname),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};

export const useNicknameSignUp = (nickname: string) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => putNicknameSignUp(nickname),
    onSuccess: () => {
      console.log('회원가입 완료');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
