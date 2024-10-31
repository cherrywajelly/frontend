import './globals.css';

import pretendard from '@/styles/font';

import RecoilRootWrapper from './RecoilRootWrapper';
import Providers from './providers';

import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'TimeToast',
  description: 'Generated by create next app',
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
          <Providers>{children}</Providers>
        </body>
      </RecoilRootWrapper>
    </html>
  );
}
