import { MyShowcaseResponse } from '@/types/api/mypage';
import {
  SearchRequestBody,
  SearchResultResponse,
  UserProfileResponse,
} from '@/types/api/search';

import {
  getUserProfile,
  getUserShowcase,
  postSearchResult,
} from '@/api/search';
import { useMutation, useQuery } from '@tanstack/react-query';

// 사용자 검색
export const usePostSearchResult = () => {
  const { mutate, isPending, error, mutateAsync } = useMutation({
    mutationFn: (item: SearchRequestBody) => postSearchResult(item),
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending, error, mutateAsync };
};

// 타 사용자 프로필 조회
export const useGetUserProfile = (memberId: number) => {
  const { data, isLoading, error, refetch } = useQuery<UserProfileResponse>({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(memberId),
  });
  return { data, isLoading, error, refetch };
};

// 타 사용자 진열장 조회
export const useGetUserShowcase = (memberId: number) => {
  const { data, isLoading, error } = useQuery<MyShowcaseResponse[]>({
    queryKey: ['userShowcase'],
    queryFn: () => getUserShowcase(memberId),
  });
  return { data, isLoading, error };
};
