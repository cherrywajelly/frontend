import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

isSupported().then((supported) => {
  if (supported) {
    initializeApp(firebaseConfig);
    getMessaging();
  } else {
    console.error('Browser does not support notifications');
  }
});

/**
 * FCM 토큰 발급
 */
export const setTokenHandler = async () => {
  const messaging = getMessaging(app);
  await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당
        console.log('error', err);
        router.refresh();
      } else {
        // 토큰 DB에 저장
        localStorage.setItem('device', currentToken);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function (registration) {
          console.log(
            'Service Worker가 scope에 등록되었습니다.:',
            registration.scope,
          );
        })
        .catch(function (err) {
          console.log('Service Worker 등록 실패:', err);
        });
    });
  }
}
