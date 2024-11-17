function registerServiceWorker() {
  if (typeof window !== 'undefined') {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then(function (registration) {
            console.log(
              // 'Service Worker가 scope에 등록되었습니다.:',
              registration.scope,
            );
            // PWA가 성공적으로 로드되면, fallback 이미지를 숨김
            document.getElementById('fallback').style.display = 'none';
          })
          .catch(function (err) {
            // console.log('Service Worker 등록 실패:', err);
          });
      });
    } else {
      // 서비스 워커 등록 실패 시, fallback 이미지 등장
      document.getElementById('fallback').style.display = 'flex';
    }
  }
}

registerServiceWorker();
