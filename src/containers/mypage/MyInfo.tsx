import Button from '@/components/common-components/button';

import UserInfo from '@/components/mypage/UserInfo';

import tempImg from '../../../public/images/timetoast.png';

import { useRouter } from 'next/navigation';

export default function MyInfo() {
  const router = useRouter();

  return (
    <div className="px-6 py-4">
      {/* user-info */}
      <UserInfo
        nickname="chaemin"
        profileImg={tempImg}
        follower={20}
        following={30}
        group={10}
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
