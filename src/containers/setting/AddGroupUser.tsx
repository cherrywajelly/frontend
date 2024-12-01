import { Dispatch, SetStateAction, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import UserListItem from '@/components/search/UserListItem';

import { useGetFollowings } from '@/hooks/api/useMyPage';
import { FollowingItemResponse } from '@/types/api/mypage';
import { UserDefaultProps } from '@/types/user';

export type AddGroupUserProps = {
  setStep: Dispatch<SetStateAction<number>>;
  selectedUsers: FollowingItemResponse[];
  setSelectedUsers: Dispatch<SetStateAction<FollowingItemResponse[]>>;
};

export default function AddGroupUser({
  setStep,
  selectedUsers,
  setSelectedUsers,
}: AddGroupUserProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  // 팔로잉 목록 조회
  const { data: followingData, isLoading: isLoadingFollowings } =
    useGetFollowings();

  // console.log(followingData);

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  const toggleUserSelection = (item: FollowingItemResponse) => {
    setSelectedUsers((prev) => {
      if (prev.includes(item)) {
        return prev.filter((user) => user !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSubmit = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col bg-gray-05">
      <div
        className="flex items-center flex-none
      "
      >
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
          {followingData &&
            followingData.followResponses.map((item) => (
              <UserListItem
                key={item.memberId}
                profileImg={item.memberProfileUrl}
                nickname={item.nickname}
                onClick={() => toggleUserSelection(item)}
              >
                {selectedUsers.includes(item) ? (
                  <RiCheckboxCircleFill
                    className="text-primary-main"
                    size={24}
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    className="text-gray-40"
                    size={24}
                  />
                )}
              </UserListItem>
            ))}
        </div>
      </div>

      <Button
        size="md"
        color={selectedUsers.length ? 'active' : 'disabled'}
        onClick={handleSubmit}
        disabled={!selectedUsers.length}
        className="flex-none mb-4"
      >
        다음
      </Button>
    </div>
  );
}
