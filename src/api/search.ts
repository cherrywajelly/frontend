import { SearchRequestBody, SearchResultResponse } from '@/types/api/search';

import { apiRequest } from '.';

// 사용자 검색
export const postSearchResult = async ({
  page,
  size,
  searchKeyword,
}: SearchRequestBody): Promise<SearchResultResponse> => {
  try {
    const res = await apiRequest(`/api/v1/search`, 'POST', {
      page,
      size,
      searchKeyword,
    });

    if (res.status === 500) {
      throw new Error('Internal Server Error');
    }

    if (res.status === 200) {
      return res.json();
    }

    return Promise.reject('Unexpected response status');
  } catch (err) {
    // console.log(err);
    return Promise.reject(err);
  }
};

// 타 사용자 프로필 조회
export const getUserProfile = async (memberId: number) => {
  const res = await apiRequest(`/api/v1/members/${memberId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 타 사용자 진열장 조회
export const getUserShowcase = async (memberId: number) => {
  const res = await apiRequest(`/api/v1/showcases/members/${memberId}`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.showcaseResponses;
};
