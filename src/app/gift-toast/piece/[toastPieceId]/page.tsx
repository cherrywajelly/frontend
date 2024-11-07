'use client';

import { HiMiniUserGroup } from 'react-icons/hi2';

import TopBar from '@/components/common-components/top-bar';

import tempImg from '../../../../../public/images/default-toast.png';

import Image from 'next/image';

type PageParams = {
  toastPieceId: number;
};

export default function GiftToastPiecePage({ params }: { params: PageParams }) {
  return (
    <div className="w-full h-lvh">
      <TopBar title="선물토스트 이름" />
      <div className="h-[calc(100vh-48px)] flex flex-col gap-4 bg-gray-05 p-6">
        {/* 선물 토스트 요약 */}

        <div className="py-4 px-5 flex justify-between bg-white border border-gray-10 rounded-[10px]">
          <div className="flex gap-2 items-center">
            <Image
              src={tempImg}
              alt=""
              width={40}
              height={40}
              className="object-cover w-[40px] h-[40px]"
            />
            <span className="text-body1 text-gray-80 line-clamp-1">
              선물토스트이름
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiMiniUserGroup className="text-gray-80" />
            <span className="text-gray-80 text-body4">그룹명그룹명</span>
          </div>
        </div>
        {/* 토스트 조각 단일 조회 */}
        <div>i</div>
      </div>
    </div>
  );
}
