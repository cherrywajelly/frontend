import './globals.css';

import pretendard from '@/styles/font';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <link rel="manifest" href="/public/manifest.json" />
        <meta name="theme-color" content="#CCC2C0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
      </Head>

      <RecoilRootWrapper>
        <body
          className={`${pretendard.variable} font-pretendard antialiased m-auto`}
        >
          <Script src="/service-worker.js" />
          <Providers>{children}</Providers>
        </body>
      </RecoilRootWrapper>
    </html>
  );
}
