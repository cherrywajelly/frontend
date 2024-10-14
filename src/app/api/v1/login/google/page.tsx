'use client';

import { useEffect } from 'react';

import { useGoogleLogin } from '@/hooks/api/useLogin';

import { useRouter } from 'next/navigation';

export default function GoogleCallback() {
  const router = useRouter();
  const code =
    (typeof window !== 'undefined' &&
      new URL(window.location.href).searchParams.get('code')) ||
    '';

  const { data, error, isLoading } = useGoogleLogin(code);

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error('Error fetching google token:', error);
      return;
    }

    if (data) {
      const accessToken: string | undefined = data.accessToken;
      const refreshToken: string | undefined = data.refreshToken;
      if (accessToken && refreshToken) {
        window.sessionStorage.setItem('accessToken', accessToken);
        window.sessionStorage.setItem('refreshToken', refreshToken);
        router.push('/');
      }
    } else {
      //   router.push('/');
      console.log('error', error);
    }
  }, [data, isLoading, error, router]);

  return isLoading ? (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center">
        {/* <Spinner /> */}
        기다리는중..
      </div>
    </div>
  ) : (
    <></>
  );
}
