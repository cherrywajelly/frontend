import './globals.css';

import pretendard from '@/styles/font';

import { Toaster } from 'react-hot-toast';

import RecoilRootWrapper from './RecoilRootWrapper';
import Providers from './providers';

import type { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';

export const metadata = {
  title: 'TimeToast',
  description: '지속 가능한 추억 아카이빙 서비스, 타잉토스트',
  manifest: '/manifest.json',
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <link rel="manifest" href="/public/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="142x142"
          href="/icons/apple-icon-142x142.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <meta name="theme-color" content="#CCC2C0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
      </Head>

      <RecoilRootWrapper>
        <body
          className={`${pretendard.variable} font-pretendard antialiased m-auto`}
        >
          <Script src="/service-worker.js" />
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
            integrity={process.env.NEXT_PUBLIC_KAKAO_JS_SDK_INTEGRITY}
            crossOrigin="anonymous"
          />
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </RecoilRootWrapper>
    </html>
  );
}
