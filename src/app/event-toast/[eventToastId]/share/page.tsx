'use client';

import { useEffect, useRef, useState } from 'react';
import { FiShare } from 'react-icons/fi';
import { FiDownload } from 'react-icons/fi';
import { FiLink } from 'react-icons/fi';

import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import {
  useGetEventToastShareTemplate,
  usePostEventToastShareTemplateContent,
} from '@/hooks/api/useEventToast';
import { notifyError, notifySuccess } from '@/utils/toast';

import { formatDate } from '@/utils';

import kakaoLogo from '../../../../../public/images/button/kakao.svg';
import shareImg from '../../../../../public/images/toast/share-thumbnail.png';

import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { userAgent } from 'next/server';

export default function EventToastSharePage() {
  const params = useParams();
  const eventToastId = Number(params.eventToastId);

  const { data, isLoading } = useGetEventToastShareTemplate(eventToastId);
  const { mutate, isPending } = usePostEventToastShareTemplateContent();

  const [text, setText] = useState<string>(data?.text || '');

  useEffect(() => {
    if (data) {
      if (data.text === null) setText('');
      else {
        setText(data.text);
      }
    }
  }, [data, eventToastId]);

  const handleSaveClick = () => {
    mutate(
      {
        eventToastId,
        text,
      },
      {
        onSuccess: (data) => {
          // console.log(data);
        },
      },
    );
  };

  const divRef = useRef<HTMLDivElement>(null);
  const { userAgent } = navigator;

  const checkUserAgent = () => {
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'IOS';
    } else if (/Chrome/.test(userAgent)) {
      return 'CHROME';
    } else if (/Safari/.test(userAgent)) {
      return 'SAFARI';
    } else {
      return 'OTHER';
    }
  };

  const handleDownload = async () => {
    if (!divRef.current) return;
    try {
      const canvas = await html2canvas(divRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2,
      });

      const dataUrl = canvas.toDataURL('image/png'); // Base64 URL
      const link = document.createElement('a');
      link.href = dataUrl;

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        link.target = '_blank';
      }

      link.download = 'event-toast.png';
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      notifyError('이미지 저장에 실패했어요!');
    }
  };

  // const handleDownload = async () => {
  //   if (!divRef.current) return;

  //   try {
  //     const div = divRef.current;

  //     const canvas = await html2canvas(div, {
  //       useCORS: true, // CORS 문제 해결
  //       backgroundColor: null, // 투명 배경 유지
  //       scale: window.devicePixelRatio || 2, // 고해상도
  //     });

  //     canvas.toBlob((blob) => {
  //       if (blob) {
  //         // iOS Safari 전용 처리
  //         const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  //         if (isIOS) {
  //           const url = URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           link.download = 'event-toast.png';
  //           document.body.appendChild(link);

  //           link.click();
  //           document.body.removeChild(link);
  //           URL.revokeObjectURL(url);
  //         } else {
  //           // 일반 브라우저 (안드로이드, 데스크탑)
  //           FileSaver.saveAs(blob, 'event-toast.png');
  //         }
  //       } else {
  //         notifyError('이미지 저장에 에러가 생겼어요!');
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error converting div to image:', error);
  //     notifyError('이미지 저장에 에러가 생겼어요!');
  //   }
  // };

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
          description: `친구의 토스트에 잼을 발라주세요!`,
          imageUrl:
            'https://github.com/user-attachments/assets/4dc1e25b-63d7-41ff-819e-f420f3cabeb8',
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

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="p-6 h-[calc(100vh-48px)] flex flex-col gap-6 items-center bg-gray-05 flex-grow overflow-y-auto">
          {/* 기타 */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                handleSaveClick();
                handleCopyUrl(`${copyUrl}`);
              }}
              className="p-4 rounded-full bg-white flex flex-col shadow-lg"
            >
              <FiLink className="text-gray-80" />
            </button>

            <button
              className="w-[48px] h-[50px] shadow-lg flex justify-center items-center bg-[#FEE500] rounded-full"
              onClick={() =>
                shareKakao(
                  copyUrl as string,
                  `${data?.nickname}님의 이벤트 토스트가 도착했어요!`,
                )
              }
            >
              <Image src={kakaoLogo} alt="kakao" />
            </button>

            <button
              onClick={handleWebShare}
              className="p-4 rounded-full bg-white flex flex-col shadow-lg"
            >
              <FiShare className="text-gray-80" />
            </button>
            <button
              onClick={handleDownload}
              className="p-4 rounded-full bg-white flex flex-col shadow-lg"
            >
              <FiDownload className="text-gray-80" />
            </button>
          </div>

          {/* 다운로드받을 이미지 영역 */}
          <div
            ref={divRef}
            className="relative flex justify-center items-center rounded-[20px] w-full h-full min-h-[706px] bg-template-pattern bg-top bg-no-repeat"
          >
            <div className="w-[273px] absolute flex flex-col gap-2 items-center top-[130px] text-white">
              <div
                style={{
                  backgroundImage: data ? `url(${data.iconImageUrl})` : ``,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '110px',
                  height: '110px',
                }}
              />
              <span className="text-body2">
                {data && data.eventToastTemplateResponse.title}
              </span>

              <textarea
                className="mt-5 h-[187px] w-full p-6 rounded-[20px] text-gray-80"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <span className="text-white text-body4 flex w-full justify-end pr-2">
                @{data && data.nickname}
              </span>

              <div className="mt-[100px] text-white text-body1">
                {data &&
                  formatDate(data?.eventToastTemplateResponse.openedDate)}
                까지 작성할 수 있어요!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
