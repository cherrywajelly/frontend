importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
  measurementId: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
};

// Firebase 초기화
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// self.addEventListener('install', function (e) {
//   console.log('Service Worker 설치');
//   self.skipWaiting();
// });

// 활성화
self.addEventListener('activate', function (e) {
  // console.log('fcm service worker가 실행되었습니다.');
  e.waitUntil(clients.claim());
});

const sCacheName = 'practice-pwa';
const aFilesToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-main.png',
];

// 서비스 워커 설치 및 캐싱
self.addEventListener('install', (event) => {
  // console.log('Service Worker 설치');
  event.waitUntil(
    caches.open(sCacheName).then((cache) => {
      // console.log('파일을 캐시에 저장합니다.');
      // return cache.addAll(aFilesToCache);
    }),
  );
});

// 푸시 알림 수신 처리
// foreground
self.addEventListener('push', (event) => {
  // console.log('푸시 이벤트 발생:', event);

  if (!event.data) {
    console.error('푸시 데이터가 없습니다.');
    return;
  }

  const data = event.data.json();
  const title = data.notification?.title || '알림';
  const options = {
    body: data.notification?.body || '새로운 메시지가 도착했습니다.',
  };

  event.waitUntil(
    self.registration.showNotification(title, options).catch((error) => {
      console.error('showNotification 에러:', error);
    }),
  );
});

// self.addEventListener('notificationclick', function (event) {
//   console.log('notificationclick');
//   const url = '/notifications';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

self.addEventListener('notificationclick', function (event) {
  event.preventDefault();
  event.notification.close();

  const urlToOpen = '/notifications';

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
