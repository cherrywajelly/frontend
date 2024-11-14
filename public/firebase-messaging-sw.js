importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: 'process.env.NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'process.env.NEXT_PUBLIC_FIREBASE_APP_ID',
  measurementId: 'process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const title = payload.notification.title + ' (onBackgroundMessage)';
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: 'https://avatars.githubusercontent.com/sasha1107',
//   };

//   self.registration.showNotification(title, notificationOptions);
// });

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const redirectUrl = event?.notification?.data?.redirectUrl;

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (const client of clientList) {
          if (client.url === redirectUrl && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(redirectUrl);
        }
      }),
  );
});
