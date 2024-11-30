import { useState } from 'react';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';
import UserListItem from '@/components/search/UserListItem';
import TargetDivider from '@/components/toast/TargetDivider';

import { useMyInfo } from '@/hooks/api/useLogin';
import { useGetFollowings, useGetGroup } from '@/hooks/api/useMyPage';

import { giftToastDataState, giftToastStepState } from '@/atoms/toastAtom';

import { useRecoilState, useSetRecoilState } from 'recoil';

export default function GiftToastWithChoiceForm() {
  const setStep = useSetRecoilState(giftToastStepState);
  const [giftData, setGiftData] = useRecoilState(giftToastDataState);

  const handleSubmit = () => {
    setStep((prev) => prev + 1);
  };

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleCancel = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  // 자기 자신 조회
  const { data: mineData, isLoading: isLoadingMineData } = useMyInfo();
  // 팔로잉 목록 및 그룹 목록 조회
  const { data: followingData, isLoading: isLoadingFollowings } =
    useGetFollowings();
  const { data: groupData, isLoading: isLoadingGroup } = useGetGroup();

  const toggleUserSelection = (
    itemId: number | null,
    type: 'mine' | 'friend' | 'group',
  ) => {
    if (giftData.id === itemId && giftData.type === type) {
      // setGiftData((prev) => ({ ...prev, id: null, type: null }));
    } else {
      setGiftData((prev) => ({ ...prev, id: itemId, type }));
    }
  };

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <InputForm title="캡슐 토스트에 함께 할 사람을 선택해주세요.">
        <div className="w-full flex items-center flex-none">
          <Input
            placeholder="검색어를 입력하세요."
            size="sm"
            search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!searchValue) {
                setIsFocused(false);
              }
            }}
            className={`transition-all duration-300 ${
              isFocused ? 'w-[calc(100%-20px)]' : 'w-full'
            }`}
          />
          {isFocused && (
            <span
              onClick={handleCancel}
              className="pl-4 whitespace-nowrap text-body1 text-gray-40 transition-opacity duration-300 opacity-100"
            >
              취소
            </span>
          )}
        </div>
      </InputForm>

      <div className="flex-grow my-6 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col gap-4">
          <TargetDivider text="나에게" />
          <UserListItem
            profileImg={mineData?.profileUrl ?? ''}
            nickname={mineData?.nickname as string}
            onClick={() => toggleUserSelection(null, 'mine')}
          >
            {giftData.type === 'mine' ? (
              <RiCheckboxCircleFill className="text-primary-main" size={24} />
            ) : (
              <RiCheckboxBlankCircleLine className="text-gray-40" size={24} />
            )}
          </UserListItem>

          <TargetDivider text="친구와 함께" />
          {followingData &&
            followingData.followResponses.map((item) => (
              <UserListItem
                key={item.memberId}
                profileImg={item.memberProfileUrl}
                nickname={item.nickname}
                onClick={() => toggleUserSelection(item.memberId, 'friend')}
              >
                {item.memberId === giftData.id && giftData.type === 'friend' ? (
                  <RiCheckboxCircleFill
                    className="text-primary-main"
                    size={24}
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    className="text-gray-40"
                    size={24}
                  />
                )}
              </UserListItem>
            ))}

          <TargetDivider text="그룹과 함께" isButton />
          {groupData &&
            groupData.teamResponses.map((item, idx) => (
              <UserListItem
                // key={item.teamId}
                key={idx}
                profileImg={item.teamProfileUrl}
                nickname={item.teamName}
                onClick={() => toggleUserSelection(item.teamId, 'group')}
              >
                {item.teamId === giftData.id && giftData.type === 'group' ? (
                  <RiCheckboxCircleFill
                    className="text-primary-main"
                    size={24}
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    className="text-gray-40"
                    size={24}
                  />
                )}
              </UserListItem>
            ))}
        </div>
      </div>

      <Button
        size="md"
        className="flex-none mb-6"
        color={giftData.type ? 'active' : 'disabled'}
        onClick={handleSubmit}
        disabled={!giftData.type}
      >
        다음
      </Button>
    </div>
  );
}
