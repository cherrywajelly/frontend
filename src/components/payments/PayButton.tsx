import { useState } from 'react';

import { usePostUserPayments } from '@/hooks/api/usePayments';

import { loadTossPayments } from '@tosspayments/payment-sdk';

import Button from '../common-components/button';

export default function PayButton() {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
  const originUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const [orderId, setOrderId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const { mutate, isPending } = usePostUserPayments();

  const payment = () => {
    loadTossPayments(clientKey as string).then((tossPayments) => {
      tossPayments
        .requestPayment('카드', {
          amount: 100,
          orderId: '1231234',
          orderName: '테스트상품',
          customerName: '테스트이름',
          successUrl: `${originUrl}/api/v1/payments/success`,
          failUrl: `${originUrl}/api/v1/payments/fail`,
        })
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          }
        });
    });
  };

  const handleClick = () => {
    mutate(
      {
        itemId: 1,
        amount: 100,
        itemType: 'ICON',
        successUrl: 'success',
        failUrl: 'fail',
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
      },
    );
    // payment();
  };

  return (
    <Button
      size="md"
      className="flex-none w-full bg-gray-80 text-white mt-8 h-[48px] px-25"
      onClick={handleClick}
    >
      결제하기
    </Button>
  );
}
