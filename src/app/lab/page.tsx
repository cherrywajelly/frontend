import { LuCalendarDays } from 'react-icons/lu';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';
import UserInfo from '@/components/mypage/UserInfo';
import ToastBox from '@/components/toast/ToastBox';

import tempImg from '../../../public/images/timetoast.png';

export default function LabPage() {
  return (
    <div className="w-full px-6 flex flex-col gap-1">
      {/* <Button size="md" color="disabled">
        다음
      </Button>
      <Button size="md" color="secondary">
        토스트 굽기
      </Button>
      <Button size="sm" color="primary">
        팔로우
      </Button>
      <Button size="sm" color="subDisabled">
        팔로잉
      </Button>
      <Button size="sm" color="active">
        프로필 편집
      </Button>
      <Button size="md" color="active">
        다음
      </Button> */}
      <div className="mt-10" />

      <ToastBox
        title="캡디종강"
        toastImg={tempImg}
        profileImg={tempImg}
        nickname="chaemin"
        openDate="2024-11-11"
      >
        <Button size="sm" color="primary">
          잼 바르기
        </Button>
      </ToastBox>

      <UserInfo
        nickname="chaemin"
        profileImg={tempImg}
        follower={20}
        following={30}
        group={10}
      >
        <div className="w-full flex justify-between gap-[10px]">
          <Button size="sm" className="w-full h-[36px]" color="primary">
            팔로우
          </Button>
          <Button size="sm" className="w-full h-[36px]">
            프로필 편집
          </Button>
        </div>
      </UserInfo>

      {/* <div>input component test</div> */}
      {/* <Input placeholder="인풋입니다인풋" /> */}
      {/* <Input placeholder="normal input" startIcon={<LuCalendarDays />} /> */}

      <InputForm
        title="TimeToast에서 사용할 닉네임을 입력해주세요."
        subTitle="닉네임"
      >
        <Input placeholder="닉네임을 입력해주세요." />
      </InputForm>

      <div className="pt-[140px]" />

      <InputForm
        title="토스트를 오픈할 특별한 날을 선택해주세요.."
        subTitle="오픈 날짜"
      >
        <Input placeholder="YYYY-MM-DD" startIcon={<LuCalendarDays />} />
      </InputForm>
    </div>
  );
}
