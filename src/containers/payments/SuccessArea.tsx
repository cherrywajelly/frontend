import { useEffect, useRef, useState } from 'react';

import Button from '@/components/common-components/button';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { usePostUserPaymentsSuccess } from '@/hooks/api/usePayments';

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
    <div className="h-lvh w-full">
      {isOpen && (
        <ConfirmDialog
          // description="결제가 완료되었어요."
          description={
            <div className="p-4 flex flex-col">
              <h1 className="text-gray-80 text-subtitle1">
                결제가 완료되었어요.
              </h1>
              {/* <span>{`주문 아이디: ${orderId}`}</span> */}
              <span>{`결제 금액: ${Number(amount).toLocaleString()}원`}</span>
            </div>
          }
          isOpen={isOpen}
          className="!max-w-[400px]"
          onClose={() => setIsOpen((prev) => !prev)}
        >
          <Button
            className="w-full text-white bg-gray-60"
            onClick={() => {
              if (iconGroupId === null) router.replace(`/setting/premiums`);
              else router.replace(`/setting/market/${iconGroupId}`);
            }}
          >
            확인
          </Button>
        </ConfirmDialog>
      )}
    </div>
  );
}
