import { useEffect } from 'react';

import Button from '@/components/common-components/button';

import UserInfo from '@/components/mypage/UserInfo';

import { useGetMyProfile } from '@/hooks/api/useMyPage';

import { useRouter } from 'next/navigation';

export default function MyInfo() {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetMyProfile();

  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <div className="px-6 py-4">
      {data && (
        <UserInfo
          nickname={data.nickname}
          profileImg={data.profileUrl}
          follower={data.followerCount}
          following={data.followingCount}
          group={data.teamCount}
        >
          <div className="w-full flex justify-between gap-[10px]">
            <Button
              size="sm"
              className="w-full h-[36px]"
              color="active"
              onClick={() => router.push('/setting/profile')}
            >
              프로필 편집
            </Button>
          </div>
        </UserInfo>
      )}
    </div>
  );
}
