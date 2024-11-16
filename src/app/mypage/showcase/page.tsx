'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import MyEventToastItem from '@/components/mypage/MyEventToastItem';

import {
  useDeleteMyShowcaseItem,
  useGetMyShowcaseList,
  usePostMyShowcaseList,
} from '@/hooks/api/useMyPage';
import { MyShowcaseListResponse } from '@/types/api/mypage';

import { useRouter } from 'next/navigation';

export default function ShowcaseEdit() {
  const router = useRouter();

  const { data: showcaseListData, isLoading: isLoadingShowcaseListData } =
    useGetMyShowcaseList();

  const showcaseList = useMemo(
    () =>
      showcaseListData?.map(
        (item) =>
          ({
            eventToastId: item.eventToastId,
            iconUrl: item.iconUrl,
            title: item.title,
            openedDate: item.openedDate,
            isShowcase: item.isShowcase,
            showCaseId: item.showCaseId,
          }) as MyShowcaseListResponse,
      ) ?? [],
    [showcaseListData],
  );

  const initialShowcaseIds = useMemo(
    () =>
      showcaseList
        .filter((item) => item.isShowcase)
        .map((item) => item.eventToastId),
    [showcaseList],
  );

  console.log('initialShowcaseIds', initialShowcaseIds);

  const [selectedToast, setSelectedToast] =
    useState<number[]>(initialShowcaseIds);

  useEffect(() => {
    if (initialShowcaseIds.length > 0) {
      setSelectedToast(initialShowcaseIds);
    }
  }, [initialShowcaseIds]);

  const toggleToastSelection = (item: MyShowcaseListResponse) => {
    setSelectedToast((prev) => {
      if (prev.includes(item.eventToastId)) {
        return prev.filter((id) => id !== item.eventToastId);
      } else {
        return prev.length < 3 ? [...prev, item.eventToastId] : prev;
      }
    });
  };

  const { mutate: postMutate, isPending: isPosting } = usePostMyShowcaseList();
  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteMyShowcaseItem();

  console.log('showcaseList', showcaseList);
  console.log('selectedToast', selectedToast);

  const handleSubmit = () => {
    const toAdd = selectedToast.filter(
      (id) => !initialShowcaseIds.includes(id),
    );
    const toDeleteItem = initialShowcaseIds.filter(
      (id) => !selectedToast.includes(id),
    );

    // 해당 eventToastId에 해당하는 showcaseId 찾기
    const toDeleteShowcaseIds = showcaseList
      .filter((item) => toDeleteItem.includes(item.eventToastId))
      .map((item) => item.showCaseId);

    console.log('삭제할 아이템:', toDeleteShowcaseIds);
    console.log('추가할 아이템:', toAdd);

    if (toDeleteShowcaseIds.length > 0) {
      Promise.all(
        toDeleteShowcaseIds.map(
          (id) =>
            new Promise<void>((resolve) =>
              deleteMutate(id, {
                onSuccess: () => {
                  resolve();
                  router.push('/mypage');
                },
              }),
            ),
        ),
      ).then(() => {
        if (toAdd.length > 0) {
          postMutate(toAdd);
        }

        router.push('/mypage');
      });
    } else {
      if (toAdd.length > 0) {
        postMutate(toAdd);
      }

      router.push('/mypage');
    }
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
              {showcaseList &&
                showcaseList?.map((item) => {
                  return (
                    <MyEventToastItem
                      key={item.eventToastId}
                      image={item.iconUrl}
                      title={item.title}
                      date={item.openedDate}
                      isSetting={false}
                      onClick={() => toggleToastSelection(item)}
                    >
                      {selectedToast.includes(item.eventToastId) ? (
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
            // color={selectedToast.length ? 'active' : 'disabled'}
            color="active"
            onClick={handleSubmit}
            // disabled={!selectedToast.length}
            className="flex-none mb-6 w-full"
          >
            전시하기
          </Button>
        </div>
      </div>
    </div>
  );
}
