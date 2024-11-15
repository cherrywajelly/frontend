'use client';

import { useEffect, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import { usePostFCMTest, usePutFCM } from '@/hooks/api/useFcm';

import ArriveEventToast from '@/containers/home/ArriveEventToast';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';
import { firebaseApp } from '@/firebase';

import Logo from '../../public/images/timetoast.png';

import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const accessToken =
    typeof window !== 'undefined' && sessionStorage.getItem('accessToken');
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const { mutate: mutateFCM, isPending } = usePutFCM();
  const { mutate: mutateFCMTest } = usePostFCMTest();

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (currentToken) {
          // console.log('FCM Token:', currentToken);
          setToken(currentToken);
          mutateFCM(currentToken, {
            onSuccess: () => {
              console.log('token성공');
            },
          });
        } else {
          console.log('토큰을 가져올 수 없습니다.');
        }
      } else {
        console.log('푸시 알림 권한이 거부되었습니다.');
      }
    } catch (error) {
      console.error('푸시 알림 권한 요청 오류:', error);
    }
  };

  const listenForMessages = () => {
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      console.log('푸시 메시지 수신:', payload);

      // 웹 푸시 알림 생성
      const notificationTitle = payload.notification?.title || '알림';
      const notificationOptions = {
        body: payload.notification?.body || '새로운 메시지가 도착했습니다.',
        title: payload.notification?.title,
        // 사용자가 직접 알림을 닫아야 함
        // requireInteraction: true,
      };

      // // 웹 푸시 알림 표시
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notificationTitle, notificationOptions);
      });
    });
  };

  useEffect(() => {
    requestPermission();
    listenForMessages();
  }, []);

  if (!accessToken) {
    return (
      <div className="p-6 box-border w-full h-screen flex flex-col justify-center items-center">
        <Image src={Logo} alt="timetoast" />
        <h1 className="text-subtitle1">타임토스트</h1>
        <h3>지속가능한 추억 아카이빙 서비스</h3>
        <Button
          color="active"
          className="w-full mt-8"
          onClick={() => {
            router.push('/login');
          }}
        >
          타임토스트 시작하기
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <TopBar title="Time Toast" isBackBtn={false} />
      <button
        className="border rounded py-2"
        onClick={() => {
          // requestPermission();
          mutateFCMTest({
            fcmConstant: 'EVENTTOASTOPENED',
            nickname: '카카오채민이다',
            toastName: 'toastName',
            param: 2,
          });
        }}
      >
        푸시 알림 켜기
      </button>

      <div className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto p-6 bg-gray-05">
        <ArriveGiftToast />
        <ArriveEventToast />
      </div>

      <BottomBar />
    </div>
  );
}
