'use client';

export default function Home() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email&access_type=offline`;

  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = googleUrl;
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div>
      <button onClick={handleKakaoLogin}>카카오로그인하기 button</button>
      <div>----</div>
      <button onClick={handleGoogleLogin}>google login button</button>
    </div>
  );
}
