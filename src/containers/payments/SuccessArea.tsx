import { useEffect, useRef, useState } from 'react';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { usePostUserPaymentsSuccess } from '@/hooks/api/usePayments';

import { Button } from '@headlessui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessArea() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentKey = searchParams.get('paymentKey') as string;
  const orderId = searchParams.get('orderId') as string;
  const amount = searchParams.get('amount');
  const iconGroupId = searchParams.get('iconGroupId');

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { mutate, isPending } = usePostUserPaymentsSuccess();

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
  }, [paymentKey, orderId, amount, mutate]);

  return (
    <>
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
    </>
  );
}
