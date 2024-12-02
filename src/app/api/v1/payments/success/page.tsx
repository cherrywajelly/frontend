'use client';

import { Suspense } from 'react';

import TopBar from '@/components/common-components/top-bar';

import SuccessArea from '@/containers/payments/SuccessArea';

export default function Success() {
  return (
    <div className="w-full h-dvh">
      {/* <TopBar title="아이콘 마켓" /> */}

      <Suspense>
        <SuccessArea />
      </Suspense>
    </div>
  );
}
