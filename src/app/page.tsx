'use client';

import { useEffect, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import { usePostFCMTest, usePutFCM } from '@/hooks/api/useFcm';

import ArriveEventToast from '@/containers/home/ArriveEventToast';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';
import { firebaseApp } from '@/firebase';

import {
  getMessaging,
  onMessage,
  getToken,
  isSupported,
} from 'firebase/messaging';
import { useRouter } from 'next/navigation';

const messaging = async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default function Home() {
  const accessToken =
    typeof window !== 'undefined' && sessionStorage.getItem('accessToken');
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const { mutate: mutateFCM, isPending } = usePutFCM();
  const { mutate: mutateFCMTest } = usePostFCMTest();

  const requestPermission = async () => {
    const messagingResolve = await messaging();
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications.');
      return;
    }
    if (messagingResolve) {
      const token = await getToken(messagingResolve);
      setToken(token);
      mutateFCM(token, {
        onSuccess: (data) => {
          console.log(data);
          mutateFCMTest();
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }

    // const permission = Notification.permission;
    // if (permission === 'granted') {
    //   return;
    // } else {
    //   Notification.requestPermission().then((permission) => {
    //     console.log('permission', permission);
    //   });
    //   return;
    // }
  };

  useEffect(() => {
    const onMessageListener = async () => {
      const messagingResolve = await messaging();
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
      if (messagingResolve) {
        onMessage(messagingResolve, (payload) => {
          if (!('Notification' in window)) {
            return;
          }
          const permission = Notification.permission;
          const title = payload.notification?.title + ' foreground';
          const body = payload.notification?.body;
          const icon = '/';
          const data = payload.data;

          if (permission === 'granted') {
            console.log('payload', payload);
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification(title, {
                body,
                icon,
                data,
              });
            });
          }
        });
      }
    };
    onMessageListener();
  }, []);

  return (
    <div className="w-full h-screen">
      <TopBar title="Time Toast" isBackBtn={false} />
      <button className="border rounded py-2" onClick={requestPermission}>
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
