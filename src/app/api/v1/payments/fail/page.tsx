'use client';

import { Suspense } from 'react';

import TopBar from '@/components/common-components/top-bar';

import FailArea from '@/containers/payments/FailArea';

export default function Fail() {
  return (
    <div className="w-full h-screen">
      <Suspense>
        <FailArea />
      </Suspense>
    </div>
  );
}
