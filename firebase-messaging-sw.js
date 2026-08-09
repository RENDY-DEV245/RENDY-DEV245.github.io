importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Inisialisasi Firebase Config AFC
firebase.initializeApp({
  apiKey: "AIzaSyDhPqickxzqSFt6SHTYK73iTflPF4_ac4o",
  authDomain: "web-afc.firebaseapp.com",
  databaseURL: "https://web-afc-default-rtdb.firebaseio.com",
  projectId: "web-afc",
  storageBucket: "web-afc.firebasestorage.app",
  messagingSenderId: "202313452502",
  appId: "1:202313452502:web:57e2551bdab34ba3b1f277"
});

const messaging = firebase.messaging();

// Menangani notifikasi saat browser/tab ditutup (Background)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received: ', payload);
  const notificationTitle = payload.notification.title || 'AFC Lifescience';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: payload.notification.icon || 'https://i.ibb.co.com/gbjyKd3w/1630640134952.jpg',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Ketika notifikasi diklik, buka link URL dari custom data
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
