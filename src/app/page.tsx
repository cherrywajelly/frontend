'use client';

import { useEffect, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import { usePutFCM } from '@/hooks/api/useFcm';

import ArriveEventToast from '@/containers/home/ArriveEventToast';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';
import { firebaseApp } from '@/firebase';

import { error } from 'console';
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
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }

    // const permission = Notification.permission;
    // if (permission === "granted") {
    //   return;
    // } else {
    //   Notification.requestPermission().then((permission) => {
    //     console.log("permission", permission);
    //   });
    //   return;
    // }
  };

  useEffect(() => {
    const onMessageListener = async () => {
      const messagingResolve = await messaging();
      if (messagingResolve) {
        onMessage(messagingResolve, (payload) => {
          if (!('Notification' in window)) {
            return;
          }
          const permission = Notification.permission;
          const title = payload.notification?.title + ' foreground';
          const redirectUrl = '/';
          const body = payload.notification?.body;
          if (permission === 'granted') {
            console.log('payload', payload);
            if (payload.data) {
              const notification = new Notification(title, {
                body,
                icon: '/icons/icon-96.png',
              });
              notification.onclick = () => {
                window.open(redirectUrl, '_blank')?.focus();
              };
            }
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
