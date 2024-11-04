'use client';

import { useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import TopBar from '@/components/common-components/top-bar';

import UserListItem from '@/components/search/UserListItem';

import { tempUserList } from '@/containers/setting/GenerateGroup';

import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  return (
    <div className="w-full h-lvh">
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
              {tempUserList.map((item, idx) => (
                <UserListItem
                  key={idx}
                  profileImg={item.profileImg}
                  nickname={item.nickname}
                  onClick={() => router.push(`/profile/${item.nickname}`)}
                >
                  {/* TODO: 팔로잉 여부에 따라 상태 관리하기 */}
                  <Button
                    size="sm"
                    color="primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    팔로우
                  </Button>
                </UserListItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[96px]" />
      <BottomBar />
    </div>
  );
}
