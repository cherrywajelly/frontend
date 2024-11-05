'use client';

import { useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import MyEventToastItem from '@/components/mypage/MyEventToastItem';

import { tempData } from '@/containers/mypage/MyFeed';

export default function ShowcaseEdit() {
  const [selectedToast, setSelectedToast] = useState(['']);

  const toggleToastSelection = (item: any) => {
    setSelectedToast((prev) => {
      if (prev.includes(item)) {
        return prev.filter((user) => user !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSubmit = () => {
    // TODO: connect api
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="진열장 편집" />

      <div className="flex flex-col bg-gray-05">
        <div className="p-6 flex flex-col gap-[2px]">
          <span className="text-gray-80 text-subtitle3">
            진열장에 전시할 토스트를 선택해 주세요 🍞
          </span>
          <span className="text-gray-80 text-body2">최대 3개까지 가능해요</span>
        </div>

        <div className="w-full h-[calc(100vh-154px)] flex flex-col justify-between flex-grow bg-white px-6 py-4 border-t-2 border-gray-10 rounded-t-[20px]">
          <div className="flex-grow mb-6 overflow-y-auto hide-scrollbar">
            <div className="flex flex-col gap-4">
              {tempData.map((item, idx) => {
                return (
                  <MyEventToastItem
                    key={idx}
                    image={item.image}
                    title={item.title}
                    date={item.date}
                    isSetting={false}
                    onClick={() => toggleToastSelection(item)}
                  >
                    {/* TODO: response type에 맞춰서 다시 상태 로직 수정하기 */}
                    {selectedToast.includes(item.title) ? (
                      <RiCheckboxCircleFill
                        className="text-primary-main my-auto"
                        size={24}
                      />
                    ) : (
                      <RiCheckboxBlankCircleLine
                        className="text-gray-40 my-auto"
                        size={24}
                      />
                    )}
                  </MyEventToastItem>
                );
              })}
            </div>
          </div>

          <Button
            size="md"
            color={selectedToast.length ? 'active' : 'disabled'}
            onClick={handleSubmit}
            disabled={!selectedToast.length}
            className="flex-none mb-6 w-full"
          >
            전시하기
          </Button>
        </div>
      </div>
    </div>
  );
}
