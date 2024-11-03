'use client';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import Showcase from '@/components/mypage/Showcase';
import UserInfo from '@/components/mypage/UserInfo';
import ToastBox, { ToastBoxProps } from '@/components/toast/ToastBox';

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

export default function UserProfilePage(props: UserProfilePageProps) {
  const { eventToastData, nickname } = props;

  return (
    <div className="w-full h-lvh">
      <TopBar
        title="닉네임넣기"
        // isRight={step === 2 ? 'submit' : false}
      />

      <div className="flex flex-col bg-gray-05">
        <div className="px-6 py-4">
          <UserInfo
            nickname={nickname}
            profileImg={tempImg}
            follower={20}
            following={30}
            group={10}
          >
            <div className="w-full flex justify-between gap-[10px]">
              <Button size="sm" className="w-full h-[36px]" color="active">
                팔로우
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

        <Showcase isMine={false} />

        <div className="px-6 pt-2 pb-6">
          <span className="text-body1 text-gray-80">채민님이 구운 토스트</span>
          <div className="pt-4 flex flex-col gap-4">
            {tempData.map((item) => (
              <ToastBox
                title={item.title}
                profileImg={item.profileImg}
                nickname={item.nickname}
                openDate={item.nickname}
                toastImg={item.toastImg}
              >
                <Button size="sm" color="primary">
                  잼 바르기
                </Button>
              </ToastBox>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
