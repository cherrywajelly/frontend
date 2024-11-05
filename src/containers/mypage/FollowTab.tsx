import { useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import UserListItem from '@/components/search/UserListItem';

import {
  useDeleteFollowerUser,
  useDeleteFollowingUser,
  useGetFollowers,
  useGetFollowings,
  useGetGroup,
  usePostFollowingUser,
} from '@/hooks/api/useMyPage';

import { useQueryClient } from '@tanstack/react-query';

import temp from '../../../public/images/timetoast.png';
import { tabVariants } from './MyFeed';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FollowTab() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || 'follower';

  const [activeTab, setActiveTab] = useState<number>(() => {
    if (tabParam === 'follower') return 0;
    if (tabParam === 'following') return 1;
    if (tabParam === 'group') return 2;
    return 0;
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
    const tabName = tab === 0 ? 'follower' : tab === 1 ? 'following' : 'group';
    router.push(`/mypage/follow?tab=${tabName}`);
  };

  const tabList = [
    { tabIdx: 0, title: '팔로워', onClick: () => handleTabClick(0) },
    { tabIdx: 1, title: '팔로잉', onClick: () => handleTabClick(1) },
    { tabIdx: 2, title: '그룹', onClick: () => handleTabClick(2) },
  ];

  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetFollowers();
  const { data: followingData, isLoading: isLoadingFollowings } =
    useGetFollowings();
  const { data: groupData, isLoading: isLoadingGroup } = useGetGroup();

  // 중복 제거를 위한 닉네임 필터링
  const followingSet = new Set(
    followingData?.followResponses?.map((item: any) => item.nickname),
  );

  // 등록 및 취소(삭제)
  const { mutate: postFollowMutate, isPending: isPendingPostFollowingUser } =
    usePostFollowingUser();
  const {
    mutate: deleteFollowingMutate,
    isPending: isPendingDeleteFollowingUser,
  } = useDeleteFollowingUser();
  const {
    mutate: deleteFollowerMutate,
    isPending: isPendingDeleteFollowerUser,
  } = useDeleteFollowerUser();

  return (
    <>
      <div className="mt-6 w-full flex border-b border-gray-10">
        {tabList.map((item) => {
          return (
            <div
              key={item.tabIdx}
              className={clsx(
                tabVariants.common,
                `${activeTab === item.tabIdx ? tabVariants.active : tabVariants.default}`,
              )}
              onClick={() => item.onClick()}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      <div className="px-6 w-full mt-6 flex items-center flex-none">
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
            isFocused ? 'w-[calc(100%-30px)]' : 'w-full'
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

      <div className="px-6 w-full h-full flex-grow my-6 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col gap-4">
          {activeTab === 0 &&
            followersData?.followResponses?.map((item: any) => {
              const isFollowing = followingSet.has(item.nickname);

              return (
                <UserListItem
                  key={item.nickname}
                  profileImg={item.memberProfileUrl || temp}
                  nickname={item.nickname}
                  onClick={() => router.push(`/profile/${item.nickname}`)}
                >
                  {isFollowing ? (
                    <Button
                      size="sm"
                      color="active"
                      className="w-[80px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFollowerMutate(item.memberId);
                      }}
                    >
                      삭제
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      color="primary"
                      className="w-[80px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        postFollowMutate(item.memberId);
                      }}
                    >
                      팔로우
                    </Button>
                  )}
                </UserListItem>
              );
            })}

          {activeTab === 1 &&
            followingData?.followResponses?.map((item: any) => {
              return (
                <UserListItem
                  key={item.nickname}
                  profileImg={item.memberProfileUrl || temp}
                  nickname={item.nickname}
                  onClick={() => router.push(`/profile/${item.nickname}`)}
                >
                  <Button
                    size="sm"
                    color="active"
                    className="w-[80px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFollowingMutate(item.memberId);
                    }}
                  >
                    삭제
                  </Button>
                </UserListItem>
              );
            })}

          {activeTab === 2 &&
            groupData?.teamResponses?.map((item: any) => {
              return (
                <UserListItem
                  key={item.teamName}
                  profileImg={item.teamProfileUrl || temp}
                  nickname={item.teamName}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}