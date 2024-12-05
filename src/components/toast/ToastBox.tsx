import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegCalendar } from 'react-icons/fa6';

import { GiftToastTeamMemberResponse } from '@/types/api/giftToast';

import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

export type ToastBoxProps = {
  title: string;
  profileImg: string | StaticImageData;
  toastImg: string | StaticImageData;
  nickname: string;
  openDate: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  memberId?: number;
  description?: string;
  isCapsule?: boolean;
  whoInfo?: GiftToastTeamMemberResponse | null;
  dDay?: number;
  giftToastType?: string;
  isOpened?: boolean;
};

export default function ToastBox(props: ToastBoxProps) {
  const {
    toastImg,
    title,
    profileImg,
    nickname,
    openDate,
    children,
    isLoading,
    onClick,
    memberId,
    description,
    isCapsule = false,
    whoInfo,
    dDay,
    giftToastType,
    isOpened,
  } = props;

  const router = useRouter();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <div
      onClick={onClick}
      className="w-full py-6 px-6 flex flex-col gap-4 bg-white border border-gray-10 rounded-[10px]"
    >
      <div className="flex gap-6">
        <Image
          src={toastImg}
          alt=""
          width={80}
          height={80}
          unoptimized
          className="object-cover w-[80px] h-[80px]"
        />

        <div className="flex flex-col gap-1 flex-1">
          <span className="text-gray-80 text-body1">{title}</span>
          <span
            className="flex gap-1 items-center"
            onClick={() => router.push(`/profile/${memberId}`)}
          >
            <Image
              src={profileImg}
              alt="profile"
              width={24}
              height={24}
              unoptimized
              className="object-cover rounded-full w-[24px] h-[24px]"
            />
            <span className="text-gray-80 text-body4">
              {nickname === null ? '나에게' : nickname}
            </span>
          </span>
          <span className="flex gap-1 items-center">
            <FaRegCalendar className="text-gray-80" />
            <span className="text-gray-80 text-body4">{openDate}</span>
          </span>
        </div>

        {!isCapsule && !isOpened && (
          <span className="text-body4 text-gray-80">D-{dDay}</span>
        )}
      </div>

      <span className="text-body4 text-gray-80">{description}</span>
      <>{children}</>

      {isCapsule && giftToastType === 'GROUP' && (
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mt-4"
            onClick={toggleAccordion}
          >
            <span className="text-gray-80 text-body3">
              {whoInfo?.teamMembersCount}명 중 {whoInfo?.isWrittenCount}명의
              친구가 작성했어요.
            </span>
            {isAccordionOpen ? (
              <FaChevronUp className="text-gray-60" />
            ) : (
              <FaChevronDown className="text-gray-60" />
            )}
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isAccordionOpen
                ? 'max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <span className="mt-4 text-body4 text-gray-80 flex flex-col gap-4">
              {whoInfo?.isWrittenMembers &&
                whoInfo.isWrittenMembers.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex gap-4 items-center"
                      onClick={() => router.push(`/profile/${item.memberId}`)}
                    >
                      <Image
                        src={item.profileUrl}
                        alt="profile"
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] object-cover rounded-full"
                      />
                      <span className="text-body4 text-gray-80">
                        {item.nickname}
                      </span>
                    </div>
                  );
                })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
