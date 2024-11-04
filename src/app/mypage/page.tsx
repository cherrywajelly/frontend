'use client';

import TopBar from '@/components/common-components/top-bar';

import MyEventToast from '@/components/mypage/MyEventToastItem';
import MyGiftToastItem from '@/components/mypage/MyGiftToastItem';
import Showcase from '@/components/mypage/Showcase';

import MyFeed from '@/containers/mypage/MyFeed';
import MyInfo from '@/containers/mypage/MyInfo';

export default function MyPage() {
  return (
    <div className="w-full h-lvh">
      <TopBar
        // onBack={handleBack}
        title="마이페이지"
        // isRight={step === 2 ? 'submit' : false}
      />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        <MyInfo />
        <Showcase isMine={true} />
        <MyFeed />

        {/* <div className="px-6">
          <MyGiftToastItem
            image=""
            title="hihihihi"
            groupUser={['초모초', 'ㅁ냥로ㅑㅁ']}
          />
        </div> */}
      </div>
    </div>
  );
}
