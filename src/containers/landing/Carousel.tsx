'use client';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Slider from 'react-slick';

import Button from '@/components/common-components/button';

import step1_new from '../../../public/images/landing/step1_new.gif';
import step2_new from '../../../public/images/landing/step2_new.gif';
import step3_new from '../../../public/images/landing/step3_new.gif';
import step4_new from '../../../public/images/landing/step4_new.gif';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 5000,
};

const Carousel = () => {
  const router = useRouter();

  const slideContent = [
    {
      title: '시간을 담는 새로운 방법, TimeToast',
      subTitle1: '',
      gif: step1_new,
      subTitle2: '토스트로 만드는 새로운 방식의 기록',
      button: <></>,
    },
    {
      title: '특별한 날은 더 특별하게',
      subTitle1: '특별한 날에 받는 친구들의 메시지',
      gif: step2_new,
      subTitle2: '이벤트 토스트를 만들어 특별한 날을 기념해보세요.',
      button: <></>,
    },
    {
      title: '함께한 순간을 더 가치있게',
      subTitle1: '미래의 나, 또는 친구들과 나누는 기억',
      gif: step3_new,
      subTitle2: '캡슐 토스트로 소중한 순간을 담은 타임캡슐을 만들어보세요.',
      button: <></>,
    },
    {
      title: (
        <>
          흩어지는 기억을 담는 <br /> 나만의 토스트
        </>
      ),
      subTitle1: '',
      gif: step4_new,
      subTitle2: '',
      button: (
        <Button
          color="active"
          className="w-full mt-8 absolute bottom-6"
          onClick={() => {
            router.push('/login');
          }}
        >
          타임토스트 시작하기
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full m-auto">
      <Slider {...settings} className="">
        {slideContent.map((item, idx) => {
          const isLastSlide = idx === slideContent.length - 1;

          return (
            <div key={idx} className="flex flex-col h-[600px]">
              <div className="">
                <span className="text-h1 text-gray-80 break-keep">
                  {item.title}
                </span>
                <br />

                <span className="break-keep text-gray-80 text-body2 text-center">
                  {item.subTitle1}
                </span>
              </div>

              <br />
              <br />
              <br />

              <div className="w-[220px] m-auto h-auto mb-[30px] break-keep shadow-lg rounded-[10px]">
                <Image
                  src={item.gif}
                  alt=""
                  width={220}
                  className="border border-gray-10 rounded-[10px]"
                />
              </div>

              <span className="text-gray-80 text-subtitle4 break-keep text-center">
                {item.subTitle2}
              </span>

              {isLastSlide && (
                <Button
                  className="w-full bg-gray-80 text-white mt-8 mb-4 h-[48px] px-25 text-subtitle3"
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  타임토스트 시작하기
                </Button>
              )}

              <br />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
