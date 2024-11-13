import { IconGroupItemResponse } from '@/types/api/iconGroups';

import { deleteIconGroups, getIconGroups } from '@/api/iconGroups';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 아이콘 그룹 목록 조회
export const useGetIconGroups = () => {
  const { data, isLoading, error } = useQuery<IconGroupItemResponse[]>({
    queryKey: ['iconGroups'],
    queryFn: () => getIconGroups(),
  });
  return { data, isLoading, error };
};

// 아이콘 그룹 목록 삭제
export const useDeleteGiftToast = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (iconGroupId: number) => deleteIconGroups(iconGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iconGroups'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error };
};
