'use client';

import { useRef } from 'react';
import { FiShare } from 'react-icons/fi';
import { FiDownload } from 'react-icons/fi';
import { FiLink } from 'react-icons/fi';

import TopBar from '@/components/common-components/top-bar';

import temp from '../../../../../public/images/toast/emptyToast.png';
import templateImg from '../../../../../public/images/toast/toast-template.png';

import saveAs from 'file-saver';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function EventToastSharePage() {
  const params = useParams();
  const eventToastId = Number(params.eventToastId);

  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 2,
        // width: div.offsetWidth,
        // height: div.offsetHeight,
      });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'result.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="공유하기" />

      <div className="p-6 h-[calc(100vh-48px)] flex flex-col gap-6 items-center bg-gray-05 flex-grow overflow-y-auto">
        {/* 기타 */}
        <div className="flex gap-4">
          <button className="p-4 rounded-full bg-white flex flex-col shadow-lg">
            <FiLink />
          </button>
          <button className="p-4 rounded-full bg-white flex flex-col shadow-lg">
            <FiShare />
          </button>
          <button
            onClick={handleDownload}
            className="p-4 rounded-full bg-white flex flex-col shadow-lg"
          >
            <FiDownload />
          </button>
        </div>

        {/* 다운로드받을 이미지 영역 */}
        <div
          ref={divRef}
          className="relative flex justify-center items-center rounded-[20px] w-[346px] h-[706px] bg-template-pattern"
        >
          <div className="absolute flex flex-col gap-2 items-center top-[130px] text-white">
            <div
              style={{
                backgroundImage: "url('/images/toast/emptyToast.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '110px',
                height: '110px',
              }}
            />
            <span className="text-body2">내 생일축하해줘</span>
          </div>

          <div className="absolute mt-[88px] w-[273px] h-[187px] flex flex-col">
            <textarea className="h-[187px] p-6 rounded-[20px]" />
          </div>

          <div className="absolute bottom-[36px] text-white text-body1">
            2024년 12월 26일까지 작성할 수 있어요!
          </div>
        </div>
      </div>
    </div>
  );
}
