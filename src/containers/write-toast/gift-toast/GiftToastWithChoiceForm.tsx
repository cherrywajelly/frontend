import { useState } from 'react';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';
import UserListItem from '@/components/search/UserListItem';

import { UserDefaultProps } from '@/types/user';

import { giftToastDataState, giftToastStepState } from '@/atoms/toastAtom';
import { tempUserList } from '@/containers/setting/GenerateGroup';

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

  //   const toggleUserSelection = (item: UserDefaultProps) => {
  //     setSelectedUsers((prev) => {
  //       if (prev.includes(item)) {
  //         return prev.filter((user) => user !== item);
  //       } else {
  //         return [...prev, item];
  //       }
  //     });
  //   };

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <InputForm title="선물 토스트에 함께 할 사람을 선택해주세요.">
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
              isFocused ? 'w-[calc(100%-30px)]' : 'w-full'
            }`}
          />
          {isFocused && (
            <span
              onClick={handleCancel}
              className="whitespace-nowrap text-body1 text-gray-40 transition-opacity duration-300 opacity-100"
            >
              취소
            </span>
          )}
        </div>
      </InputForm>

      <div className="flex-grow my-6 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col gap-4">
          {tempUserList.map((item, idx) => (
            <UserListItem
              key={idx}
              profileImg={item.profileImg}
              nickname={item.nickname}
              // onClick={() => toggleUserSelection(item)}
            >
              {/* {selectedUsers.includes(item) ? (
                  <RiCheckboxCircleFill
                    className="text-primary-main"
                    size={24}
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    className="text-gray-40"
                    size={24}
                  />
                )} */}
              <>hi</>
            </UserListItem>
          ))}
        </div>
      </div>

      <Button
        size="md"
        className="flex-none"
        // color={giftData.toastName ? 'active' : 'disabled'}
        onClick={handleSubmit}
        // disabled={!giftData.toastName}
      >
        다음
      </Button>
    </div>
  );
}
