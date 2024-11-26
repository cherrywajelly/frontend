'use client';

import { useRef } from 'react';
import { FiShare } from 'react-icons/fi';
import { FiDownload } from 'react-icons/fi';
import { FiLink } from 'react-icons/fi';

import TopBar from '@/components/common-components/top-bar';

import { notifyError, notifySuccess } from '@/utils/toast';

import kakaoLogo from '../../../../../public/images/button/kakao.svg';
import temp from '../../../../../public/images/timetoast.png';
import templateImg from '../../../../../public/images/toast/toast-template.png';

import saveAs from 'file-saver';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function EventToastSharePage() {
  const params = useParams();
  const eventToastId = Number(params.eventToastId);

  const divRef = useRef<HTMLDivElement>(null);

  // const handleDownload = async () => {
  //   if (!divRef.current) return;

  //   try {
  //     const div = divRef.current;
  //     const canvas = await html2canvas(div, {
  //       scale: 2,
  //       // width: div.offsetWidth,
  //       // height: div.offsetHeight,
  //     });
  //     canvas.toBlob((blob) => {
  //       if (blob !== null) {
  //         saveAs(blob, 'result.png');
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error converting div to image:', error);
  //   }
  // };

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (blob !== null) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'result.png'; // 다운로드 파일 이름 설정
          link.click();
          URL.revokeObjectURL(url); // 메모리 해제
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        notifySuccess('링크가 복사되었어요!');
      })
      .catch((error) => {
        notifyError('다시 시도해주세요!');
      });
  };

  const copyUrl =
    typeof window !== 'undefined' && window.location.href.replace('/share', '');

  const shareKakao = (route: string, title: string) => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_APP_KEY);
      }

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: '친구의 토스트에 잼을 발라주세요!',
          imageUrl:
            'https://timetoast.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftimetoast.5b1b48cc.png&w=640&q=75',
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
        buttons: [
          {
            title: '잼 바르기',
            link: {
              mobileWebUrl: route,
              webUrl: route,
            },
          },
        ],
      });
    }
  };

  const handleWebShare = async () => {
    const url =
      typeof window !== 'undefined'
        ? window.location.href.replace('/share', '')
        : '';
    const title = '🍞친구가 토스트를 구웠어요🍞';
    const text = '친구의 토스트에 잼을 발라주세요!';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        notifySuccess('공유가 완료되었습니다!');
      } catch (error) {
        console.error('Error sharing:', error);
        // notifyError('공유에 실패했습니다.');
      }
    } else {
      notifyError('공유 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="공유하기" />

      <div className="p-6 h-full flex flex-col gap-6 items-center bg-gray-05 flex-grow">
        {/* 기타 */}
        <div className="flex gap-4">
          <button
            onClick={() => handleCopyUrl(`${copyUrl}`)}
            className="p-4 rounded-full bg-white flex flex-col shadow-lg"
          >
            <FiLink />
          </button>

          <button
            className="w-[48px] h-[50px] shadow-lg flex justify-center items-center bg-[#FEE500] rounded-full"
            onClick={() => shareKakao(copyUrl as string, 'kakao 공유하깅')}
          >
            <Image src={kakaoLogo} alt="kakao" />
          </button>

          <button
            onClick={handleWebShare}
            className="p-4 rounded-full bg-white flex flex-col shadow-lg"
          >
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
