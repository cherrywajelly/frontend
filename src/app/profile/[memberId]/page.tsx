'use client';

import { useEffect, useMemo, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import CustomSkeleton from '@/components/common-components/skeleton';
import TopBar from '@/components/common-components/top-bar';

import Showcase from '@/components/mypage/Showcase';
import UserInfo from '@/components/mypage/UserInfo';
import ToastBox from '@/components/toast/ToastBox';

import { useGetUserEventToastList } from '@/hooks/api/useEventToast';
import {
  useDeleteFollowingUser,
  usePostFollowingUser,
} from '@/hooks/api/useMyPage';
import { useGetUserProfile, useGetUserShowcase } from '@/hooks/api/useSearch';
import { EventToastItemResponse } from '@/types/api/eventToast';
import { MyShowcaseResponse } from '@/types/api/mypage';

import tempImg from '../../../../public/images/timetoast.png';

import { useRouter } from 'next/navigation';

export type PageProps = {
  memberId: number;
};

export default function UserProfilePage({ params }: { params: PageProps }) {
  const memberId = params.memberId;
  const router = useRouter();

  const {
    data,
    isLoading: isLoadingUserProfile,
    refetch: refetchProfile,
  } = useGetUserProfile(memberId);

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

  const { data: userEventToastData, refetch } =
    useGetUserEventToastList(memberId);

  const [isFollow, setIsFollow] = useState(data?.isFollow ?? false);

  useEffect(() => {
    if (data?.isFollow !== undefined) {
      setIsFollow(data.isFollow);
    }
  }, [data]);

  // 등록 및 취소(삭제)
  const { mutate: postFollowMutate, isPending: isPendingPostFollowingUser } =
    usePostFollowingUser();

  const {
    mutate: deleteFollowingMutate,
    isPending: isPendingDeleteFollowingUser,
  } = useDeleteFollowingUser();

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
    [userEventToastData],
  );

  const handleFollowClick = () => {
    if (isFollow) {
      deleteFollowingMutate(memberId, {
        onSuccess: () => {
          setIsFollow(false);
          refetch();
          refetchProfile();
        },
        onError: (error) => {
          console.error('언팔로우 실패:', error);
        },
      });
    } else {
      postFollowMutate(memberId, {
        onSuccess: () => {
          setIsFollow(true);
          refetch();
          refetchProfile();
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

      <div className="h-[calc(100vh-144px)] flex flex-grow flex-col bg-gray-05 overflow-y-auto">
        <div className="px-6 py-4">
          <UserInfo
            nickname={data?.nickname ?? ''}
            profileImg={data?.profileUrl ?? tempImg}
            follower={data?.followerCount ?? 0}
            following={data?.followingCount ?? 0}
            group={data?.teamCount ?? 0}
            isLoading={isLoadingUserProfile}
          >
            <div className="w-full flex justify-between gap-[10px]">
              {isLoadingUserProfile ? (
                <CustomSkeleton height={36} containerClassName="w-full" />
              ) : isFollow ? (
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
          isLoading={isLoadingShowcaseData}
        />

        <div className="px-6 pt-2 pb-6 flex flex-col">
          {isLoadingUserProfile ? (
            <CustomSkeleton height={24} containerClassName="" />
          ) : (
            <span className="text-body1 text-gray-80">
              {data && data.nickname}님이 구운 토스트
            </span>
          )}

          {!isLoadingUserProfile &&
          isFollow &&
          userEventToastDataList.length > 0 ? (
            <div className="pt-4 flex flex-col gap-4">
              {userEventToastDataList.map((item) => (
                <ToastBox
                  key={item.eventToastId}
                  title={item.title}
                  profileImg={item.memberProfileUrl}
                  nickname={item.nickname}
                  openDate={item.openedDate}
                  toastImg={item.icon.iconImageUrl}
                >
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() =>
                      router.push(`/event-toast/${item.eventToastId}`)
                    }
                  >
                    잼 바르기
                  </Button>
                </ToastBox>
              ))}
            </div>
          ) : isLoadingUserProfile ? (
            <CustomSkeleton height={50} containerClassName="mt-4" />
          ) : (
            <div className="mt-4 w-full text-center text-body4 bg-white border border-gray-10 p-4 rounded-[10px]">
              {isFollow ? (
                <>{data?.nickname}님이 아직 토스트를 굽지 않았어요!</>
              ) : (
                <>
                  <b>{data?.nickname}</b>님을 팔로우하면 토스트를 볼 수 있어요!
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
