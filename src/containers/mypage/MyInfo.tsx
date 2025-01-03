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
    <div data-testid="my-info" className="px-6 py-4">
      <UserInfo
        nickname={data?.nickname ?? ''}
        profileImg={data?.profileUrl ?? ''}
        follower={data?.followerCount ?? 0}
        following={data?.followingCount ?? 0}
        group={data?.teamCount ?? 0}
        isLoading={isLoading}
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
    </div>
  );
}
