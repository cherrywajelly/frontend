import { InquiriesRequestBody, RequestGroupTeam } from '@/types/api/setting';

import {
  deleteWithdrawal,
  postGroupTeam,
  postGroupTeamImage,
  postInquiries,
  postProfileImage,
} from '@/api/setting';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

// 그룹 등록
export const useGroupTeam = ({ teamName, teamMembers }: RequestGroupTeam) => {
  const { mutate, isPending, error, data, mutateAsync } = useMutation({
    mutationFn: () =>
      postGroupTeam({
        teamName,
        teamMembers,
      }),
    onSuccess: (data) => {},
    onError: (error) => {},
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
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};

// 그룹 이미지 등록
export const usePostGroupImage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ teamId, teamImage }: { teamId: number; teamImage: File }) =>
      postGroupTeamImage(teamId, teamImage),
    onSuccess: () => {
      router.push('/setting/group');
      // queryClient.invalidateQueries({ queryKey: [''] });
    },
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};

// 회원 탈퇴
export const useDeleteWithdrawal = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => deleteWithdrawal(),
    onSuccess: () => {
      window.location.href = '/';
      sessionStorage.clear();
      localStorage.clear();
    },
    onError: (error) => {},
  });
  return { mutate, isPending, error };
};

// 문의 작성 저장
export const usePostInquiries = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (item: InquiriesRequestBody) => postInquiries(item),
    onSuccess: () => {},
    onError: (error) => {
      // console.error(error);
    },
  });

  return { mutate, isPending, error };
};
