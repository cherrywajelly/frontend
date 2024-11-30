'use client';

import { useEffect, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import Input from '@/components/common-components/input';
import TopBar from '@/components/common-components/top-bar';

import UserListItem from '@/components/search/UserListItem';

import { usePostSearchResult } from '@/hooks/api/useSearch';
import { SearchItemResponse } from '@/types/api/search';

import { memberIdState } from '@/atoms/userInfoAtom';

import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

export default function SearchPage() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const memberId = useRecoilValue(memberIdState);

  const { mutate, isPending, error, mutateAsync } = usePostSearchResult();

  const [searchResults, setSearchResults] = useState<SearchItemResponse[]>([]);

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const router = useRouter();

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
    setSearchResults([]);
  };

  const searchKeyword = async (keyword: string) => {
    setSearchValue(keyword);
    if (keyword.trim()) {
      mutate(
        { page: pageIndex, size: pageSize, searchKeyword: keyword },
        {
          onSuccess: (data) => {
            setSearchResults(data.searchResponses);
          },
          onError: (err) => {
            setSearchResults([]);
          },
        },
      );
    }
  };

  useEffect(() => {
    searchKeyword(searchValue);
    if (!searchValue.length) setSearchResults([]);
  }, [pageIndex, pageSize, searchValue]);

  return (
    <div className="w-full h-lvh bg-gray-05">
      <TopBar title="검색" isBackBtn={false} />

      <div className="h-[calc(100vh-144px)] flex flex-col bg-gray-05">
        <div className="w-full h-full p-6 flex flex-col bg-gray-05">
          <div className="flex items-center flex-none">
            <Input
              placeholder="검색어를 입력하세요."
              size="sm"
              search
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!searchValue) {
                  setIsFocused(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const { value } = e.currentTarget;
                  searchKeyword(value);
                }
              }}
              className={`transition-all duration-300 ${
                isFocused ? 'w-[calc(100%-20px)]' : 'w-full'
              }`}
            />
            {isFocused && (
              <span
                onClick={handleCancel}
                className="whitespace-nowrap text-body1 text-gray-40 transition-opacity duration-300 opacity-100"
              >
                취소
              </span>
            )}
          </div>

          <div className="flex-grow my-6 overflow-y-auto hide-scrollbar">
            <div className="flex flex-col gap-4">
              {searchResults &&
                searchResults.map((item) => (
                  <UserListItem
                    key={item.memberId}
                    profileImg={item.profileUrl}
                    nickname={item.nickname}
                    onClick={() => {
                      if (item.memberId === memberId) router.push('/mypage');
                      else router.push(`/profile/${item.memberId}`);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
