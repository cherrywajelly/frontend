import Button from '@/components/common-components/button';

import UserInfo from '@/components/mypage/UserInfo';

import tempImg from '../../../public/images/timetoast.png';

export default function MyInfo() {
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
          <Button size="sm" className="w-full h-[36px]" color="active">
            프로필 편집
          </Button>
          <Button
            size="sm"
            className="w-full h-[36px] border border-gray-80 text-gray-80 !bg-gray-05"
          >
            공유하기
          </Button>
        </div>
      </UserInfo>
    </div>
  );
}
