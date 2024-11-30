'use client';

import { Suspense } from 'react';

import TopBar from '@/components/common-components/top-bar';

import FailArea from '@/containers/payments/FailArea';

export default function Fail() {
  return (
    <>
      <div className="w-full h-lvh">
        <TopBar title="아이콘 마켓" />
        <Suspense>
          <FailArea />
        </Suspense>
      </div>
    </>
  );
}
