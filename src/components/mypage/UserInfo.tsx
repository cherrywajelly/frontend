import { UserInfoProps } from '@/types/mypage';

import defaultImg from '../../../public/images/timetoast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const variants = {
  container: 'flex flex-col gap-[2px] justify-center items-center w-[48px]',
  count: 'text-body3 text-black-main',
  text: 'text-body4 text-gray-80',
  line: 'h-[16px] border-l border-gray-20',
};

export default function UserInfo(props: UserInfoProps) {
  const { nickname, profileImg, follower, following, group, children } = props;
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Image
          src={profileImg ?? defaultImg}
          alt="profile"
          width={124}
          height={124}
          className="rounded-full border border-gray-10 w-[124px] h-[124px] object-cover"
        />

        <span className="text-black-main text-body1">{nickname}</span>

        <div className="flex gap-6 items-center">
          <span
            className={variants.container}
            onClick={() => router.push('/mypage/follow?tab=follower')}
          >
            <span className={variants.count}>{follower ?? 0}</span>
            <span className={variants.text}>팔로워</span>
          </span>

          <span className={variants.line} />

          <span
            className={variants.container}
            onClick={() => router.push('/mypage/follow?tab=following')}
          >
            <span className={variants.count}>{following ?? 0}</span>
            <span className={variants.text}>팔로잉</span>
          </span>

          <span className={variants.line} />

          <span
            className={variants.container}
            onClick={() => router.push('/mypage/follow?tab=group')}
          >
            <span className={variants.count}>{group ?? 0}</span>
            <span className={variants.text}>그룹</span>
          </span>
        </div>
      </div>
      <div className="pt-4">{children}</div>
    </>
  );
}
