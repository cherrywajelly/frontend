'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { usePostUserPaymentsSuccess } from '@/hooks/api/usePayments';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();

  const paymentKey = searchParams.get('paymentKey') as string;
  const orderId = searchParams.get('orderId') as string;
  const amount = searchParams.get('amount');
  const iconGroupId = searchParams.get('iconGroupId');

  const router = useRouter();

  const { mutate, isPending } = usePostUserPaymentsSuccess();

  const hasMutated = useRef(false);

  useEffect(() => {
    if (hasMutated.current) return;
    hasMutated.current = true;

    const init = async () => {
      mutate(
        {
          paymentKey: paymentKey,
          orderId: orderId,
          amount: Number(amount),
        },
        {
          onSuccess: (data) => {
            console.log('data:', data);
          },
          onError: (error) => {
            console.log('Error:', error);
          },
        },
      );

      // window.history.replaceState(null, '', window.location.href);
    };
    init();
  }, [mutate]);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="w-full h-lvh">
      <TopBar title="아이콘 마켓" />
      <div className="h-[calc(100vh-48px)] p-6 flex flex-col bg-white py-6">
        <h1>결제 성공</h1>
        <div>{`주문 아이디: ${orderId}`}</div>
        <div>{`결제 금액: ${Number(amount).toLocaleString()}원`}</div>
      </div>

      {isOpen && (
        <ConfirmDialog
          description="결제가 완료되었어요."
          isOpen={isOpen}
          className="!max-w-[400px]"
          onClose={() => setIsOpen((prev) => !prev)}
        >
          <Button
            className="w-full text-white bg-gray-60"
            onClick={() => router.push(`/setting/market/${iconGroupId}`)}
          >
            확인
          </Button>
        </ConfirmDialog>
      )}
    </div>
  );
}
