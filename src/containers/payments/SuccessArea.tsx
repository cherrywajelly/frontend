import { useEffect, useRef, useState } from 'react';

import Button from '@/components/common-components/button';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { usePostUserPaymentsSuccess } from '@/hooks/api/usePayments';
import { notifySuccess } from '@/utils/toast';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessArea() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentKey = searchParams.get('paymentKey') as string;
  const orderId = searchParams.get('orderId') as string;
  const amount = searchParams.get('amount');

  const { mutate } = usePostUserPaymentsSuccess();
  const hasMutated = useRef(false);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) return;

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
          onSuccess: () => {
            // console.log('결제 성공');
            // notifySuccess('결제 성공!');
            // setIsOpen(true); // 결제 성공 후 모달 표시
          },
          onError: (error) => {
            console.error('Error:', error);
          },
        },
      );
    };
    init();
  }, []);

  return (
    <div className="h-lvh w-full m-auto">
      <div className="h-full p-4 flex justify-center items-center flex-col">
        <h1 className="text-gray-80 text-subtitle1">결제가 완료되었어요.</h1>
        <span>{`결제 금액: ${Number(amount).toLocaleString()}원`}</span>

        <Button
          onClick={() => {
            router.back();
            router.back();
          }}
          color="primary"
          size="sm"
          className="my-6"
        >
          이전 페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
}
