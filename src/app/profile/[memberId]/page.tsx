'use client';

import { useMemo, useState } from 'react';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import Showcase from '@/components/mypage/Showcase';
import UserInfo from '@/components/mypage/UserInfo';
import ToastBox, { ToastBoxProps } from '@/components/toast/ToastBox';

import { useGetUserEventToastList } from '@/hooks/api/useEventToast';
import {
  useDeleteFollowingUser,
  usePostFollowingUser,
} from '@/hooks/api/useMyPage';
import { useGetUserProfile, useGetUserShowcase } from '@/hooks/api/useSearch';
import { EventToastItemResponse } from '@/types/api/eventToast';
import { MyShowcaseResponse } from '@/types/api/mypage';
import { UserProfileResponse } from '@/types/api/search';
import { UserProfilePageProps } from '@/types/mypage';

import tempImg from '../../../../public/images/timetoast.png';

const tempData: ToastBoxProps[] = [
  {
    title: '토토토리리리',
    profileImg: tempImg,
    toastImg: tempImg,
    nickname: 'chaemin',
    openDate: '2024-11-11',
  },
  {
    title: '토토토리리리',
    profileImg: tempImg,
    toastImg: tempImg,
    nickname: 'chaemin',
    openDate: '2024-11-11',
  },
  {
    title: '토토토리리리',
    profileImg: tempImg,
    toastImg: tempImg,
    nickname: 'chaemin',
    openDate: '2024-11-11',
  },
];

export type PageProps = {
  memberId: number;
};

export default function UserProfilePage({ params }: { params: PageProps }) {
  const memberId = params.memberId;

  const { data, isLoading } = useGetUserProfile(memberId);

  const { data: showcaseData, isLoading: isLoadingShowcaseData } =
    useGetUserShowcase(memberId);

  const showcaseDataList = useMemo(
    () =>
      showcaseData?.map(
        (item) =>
          ({
            eventToastId: item.eventToastId,
            iconUrl: item.iconUrl,
          }) as MyShowcaseResponse,
      ) ?? [],
    [showcaseData],
  );

  const { data: userEventToastData } = useGetUserEventToastList(memberId);

  const userEventToastDataList = useMemo(
    () =>
      userEventToastData?.map(
        (item) =>
          ({
            eventToastId: item.eventToastId,
            title: item.title,
            openedDate: item.openedDate,
            memberProfileUrl: item.memberProfileUrl,
            nickname: item.nickname,
            postedJam: item.postedJam,
            icon: item.icon,
          }) as EventToastItemResponse,
      ) ?? [],
    [data],
  );

  const [isFollow, setIsFollow] = useState(data?.isFollow ?? false);

  // 등록 및 취소(삭제)
  const { mutate: postFollowMutate, isPending: isPendingPostFollowingUser } =
    usePostFollowingUser();

  const {
    mutate: deleteFollowingMutate,
    isPending: isPendingDeleteFollowingUser,
  } = useDeleteFollowingUser();

  const handleFollowClick = () => {
    if (isFollow) {
      deleteFollowingMutate(memberId, {
        onSuccess: () => {
          setIsFollow(false);
        },
        onError: (error) => {
          console.error('언팔로우 실패:', error);
        },
      });
    } else {
      postFollowMutate(memberId, {
        onSuccess: () => {
          setIsFollow(true);
        },
        onError: (error) => {
          console.error('팔로우 실패:', error);
        },
      });
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title={data?.nickname} />

      <div className="flex flex-col bg-gray-05 h-[calc(100vh-48px)]">
        <div className="px-6 py-4">
          <UserInfo
            nickname={data?.nickname ?? ''}
            profileImg={data?.profileUrl ?? tempImg}
            follower={data?.followerCount ?? 0}
            following={data?.followingCount ?? 0}
            group={data?.teamCount ?? 0}
          >
            <div className="w-full flex justify-between gap-[10px]">
              {isFollow ? (
                <Button
                  size="sm"
                  className="w-full h-[36px]"
                  color="disabled"
                  onClick={handleFollowClick}
                  disabled={isPendingDeleteFollowingUser}
                >
                  팔로잉
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="w-full h-[36px]"
                  color="primary"
                  onClick={handleFollowClick}
                  disabled={isPendingPostFollowingUser}
                >
                  팔로우
                </Button>
              )}
            </div>
          </UserInfo>
        </div>

        <Showcase
          isMine={false}
          data={showcaseDataList}
          nickname={data?.nickname ?? ''}
        />

        {data && (
          <div className="px-6 pt-2 pb-6 flex flex-col">
            <span className="text-body1 text-gray-80">
              {data.nickname}님이 구운 토스트
            </span>
            {!isLoading &&
            data.isFollow &&
            userEventToastDataList.length > 0 ? (
              <div className="pt-4 flex flex-col gap-4">
                {userEventToastDataList.map((item) => (
                  <ToastBox
                    key={item.nickname}
                    title={item.title}
                    profileImg={item.memberProfileUrl}
                    nickname={item.nickname}
                    openDate={item.nickname}
                    toastImg={item.icon.iconImageUrl}
                  >
                    <Button size="sm" color="primary">
                      잼 바르기
                    </Button>
                  </ToastBox>
                ))}
              </div>
            ) : (
              <div className="mt-4 w-full text-center text-body4 bg-white border border-gray-10 p-4 rounded-[10px]">
                {data.nickname}님이 아직 토스트를 굽지 않았어요!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
