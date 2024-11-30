import { useDebugValue, useMemo, useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import UserListItem from '@/components/search/UserListItem';

import { useDeleteGroup, useGetGroup } from '@/hooks/api/useMyPage';
import { GroupItemResponse } from '@/types/api/mypage';

import temp from '../../../public/images/timetoast.png';

import { useRouter } from 'next/navigation';

export default function GroupList() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  const handleClick = () => {
    router.push('/setting/group/create');
  };

  const { data: groupData, isLoading: isLoadingGroup } = useGetGroup();
  const { mutate, isPending } = useDeleteGroup();

  const filteredGroupData = useMemo(() => {
    return groupData?.teamResponses.filter((item: GroupItemResponse) =>
      item.teamName.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, groupData]);

  return (
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
            className="pl-4 whitespace-nowrap text-body1 text-gray-40 transition-opacity duration-300 opacity-100"
          >
            취소
          </span>
        )}
      </div>

      <div className="flex-grow my-6 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col gap-4">
          {filteredGroupData?.map((item: GroupItemResponse) => (
            <UserListItem
              key={item.teamId}
              profileImg={item.teamProfileUrl}
              nickname={item.teamName}
            >
              <Button
                size="sm"
                color="active"
                className="w-[80px]"
                onClick={(e) => {
                  e.stopPropagation();
                  mutate(item.teamId);
                }}
              >
                삭제
              </Button>
            </UserListItem>
          ))}
        </div>
      </div>

      <Button
        size="md"
        color="secondary"
        onClick={handleClick}
        className="flex-none mb-4"
      >
        그룹 만들기
      </Button>
    </div>
  );
}
