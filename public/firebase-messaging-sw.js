importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

// const firebaseConfig = {
//   apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
//   authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
//   projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
//   storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
//   messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
//   appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
//   measurementId: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const title = payload.notification.title + ' (onBackgroundMessage)';
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(title, notificationOptions);
// });

// self.addEventListener('push', function (event) {
//   if (event.data) {
//     // 알림 메세지일 경우엔 event.data.json().notification;
//     const data = event.data.json().data;
//     const options = {
//       body: data.body,
//       icon: data.image,
//     };

//     event.waitUntil(self.registration.showNotification(data.title, options));
//   } else {
//     console.log('This push event has no data.');
//   }
// });

// // self.addEventListener('notificationclick', function (event) {
// //   event.notification.close();

// //   const redirectUrl = event?.notification?.data?.redirectUrl;

// //   event.waitUntil(
// //     clients
// //       .matchAll({
// //         type: 'window',
// //       })
// //       .then(function (clientList) {
// //         for (const client of clientList) {
// //           if (client.url === redirectUrl && 'focus' in client) {
// //             return client.focus();
// //           }
// //         }
// //         if (clients.openWindow) {
// //           return clients.openWindow(redirectUrl);
// //         }
// //       }),
// //   );
// // });

// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();

//   const redirectUrl = event.notification.data?.redirectUrl || '/';

//   event.waitUntil(
//     clients
//       .matchAll({
//         type: 'window',
//       })
//       .then(function (clientList) {
//         for (const client of clientList) {
//           if (client.url === redirectUrl && 'focus' in client) {
//             return client.focus();
//           }
//         }
//         if (clients.openWindow) {
//           return clients.openWindow(redirectUrl);
//         }
//       }),
//   );
// });

/* 2트 */
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
);

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm service worker가 실행되었습니다.');
});

const firebaseConfig = {
  apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
  measurementId: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
