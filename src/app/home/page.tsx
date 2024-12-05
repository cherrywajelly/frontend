'use client';

import { useEffect, useState } from 'react';
import { CgHome } from 'react-icons/cg';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import { usePutFCM } from '@/hooks/api/useFcm';

import { bottomBarItemState } from '@/atoms/componentAtom';
import ArriveEventToast from '@/containers/home/ArriveEventToast';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';
import { firebaseApp } from '@/firebase';

import { getMessaging, getToken } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);

  const { mutate: mutateFCM, isPending } = usePutFCM();

  const [selectedItem, setSelectedItem] = useRecoilState(bottomBarItemState);

  useEffect(() => {
    setSelectedItem({
      icon: <CgHome />,
      title: '홈',
      url: '/home',
    });

    const fetchTokenAndSave = async () => {
      try {
        const existingToken = sessionStorage.getItem('fcmToken');
        if (existingToken) {
          // console.log('이미 저장된 토큰이 있습니다:', existingToken);
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          // console.log('푸시 알림 권한이 거부되었습니다.');
          return;
        }

        const messaging = getMessaging(firebaseApp);
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (!currentToken) {
          // console.log('토큰을 가져올 수 없습니다.');
          return;
        }

        // console.log('FCM Token:', currentToken);
        setToken(currentToken);
        sessionStorage.setItem('fcmToken', currentToken);

        mutateFCM(currentToken, {
          onSuccess: () => {
            // console.log('토큰 저장 성공');
          },
        });
      } catch (error) {
        // console.error('푸시 알림 권한 요청 오류:', error);
      }
    };

    fetchTokenAndSave();
  }, [mutateFCM]);

  return (
    <div className="w-full h-screen bg-gray-05">
      <TopBar title="TimeToast" isBackBtn={false} />

      <div className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto p-6 bg-gray-05">
        <ArriveGiftToast />
        <ArriveEventToast />
      </div>

      <BottomBar />
    </div>
  );
}
