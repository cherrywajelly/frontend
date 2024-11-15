'use client';

import { useEffect, useState } from 'react';

import Spinner from '@/components/common-components/spinner';

import { useGoogleLogin } from '@/hooks/api/useLogin';

import { useRouter } from 'next/navigation';

export default function GoogleCallback() {
  const router = useRouter();

  const [googleCode, setGoogleCode] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = new URL(window.location.href).searchParams.get('code') || '';
      setGoogleCode(code);
    }
  }, []);

  const { data, error, isLoading } = useGoogleLogin(googleCode);

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
      }
      if (data.isNew) {
        router.push('/sign-up');
      } else {
        router.push('/home');
      }
    } else {
      console.log(data);
    }
  }, [data, isLoading, error, router]);

  return isLoading ? (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  ) : (
    <></>
  );
}
