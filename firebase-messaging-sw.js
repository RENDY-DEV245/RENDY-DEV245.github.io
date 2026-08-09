// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Konfigurasi Firebase Anda
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

// Menangani notifikasi saat browser ditutup / tidak aktif (Pesan Umum & Abandoned Cart)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Pesan background diterima:', payload);

  const notificationTitle = payload.notification?.title || 'Notifikasi AFC Lifescience';
  const notificationOptions = {
    body: payload.notification?.body || 'Anda mendapat pesan baru.',
    icon: payload.notification?.icon || 'https://i.ibb.co.com/gbjyKd3w/1630640134952.jpg',
    badge: 'https://i.ibb.co.com/gbjyKd3w/1630640134952.jpg',
    data: {
      url: payload.data?.url || '/' // Mengambil URL tujuan jika ada di payload
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Menangani Aksi Klik Notifikasi (Membuka / Mengarahkan Pengguna Kembali ke Website)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Jika tab website sudah terbuka, langsung fokus ke tab tersebut
      for (let client of windowClients) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika tab belum terbuka, buka tab/jendela baru
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
