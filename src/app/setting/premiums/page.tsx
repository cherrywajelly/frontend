'use client';

import { useState } from 'react';

import Button from '@/components/common-components/button';
import TopBar from '@/components/common-components/top-bar';

import { usePostUserPayments } from '@/hooks/api/usePayments';
import { requestTossPayments } from '@/utils/payments';

import PremiumsInfo from '@/containers/premiums/PremiumsInfo';

export default function PremiumsPage() {
  const [selectedItem, setSelectedItem] = useState<string>('BASIC');
  const originUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const { mutate: mutateUserPayments, isPending: isPendingUserPayments } =
    usePostUserPayments();

  const handleSubmit = () => {
    mutateUserPayments(
      {
        itemId: 2,
        amount: 5500,
        itemType: 'PREMIUM',
        successUrl: `${originUrl}/api/v1/payments/success`,
        failUrl: `${originUrl}/api/v1/payments/fail`,
      },
      {
        onSuccess: (responseData) => {
          requestTossPayments({
            amount: 5500,
            orderId: responseData.orderId,
            orderName: responseData.orderName,
            customerName: responseData.customerEmail,
            successUrl: responseData.successUrl,
            failUrl: responseData.failUrl,
          });
        },
      },
    );
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="구독 플랜" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-6 justify-between bg-gray-05 p-6">
        {/* info */}
        <div className="h-full flex flex-col">
          <div className="flex flex-col gap-2">
            <span className="text-black-main text-subtitle3">
              구독할 이용권을 선택하세요.
            </span>
            <span className="text-gray-80 text-body4">
              여기다 뭐를 써야할까? 여기다 뭐를 써야할까? 여기
              <br />
              여기다 뭐를 써야할까?
            </span>
          </div>
          <PremiumsInfo
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>

        {selectedItem === 'PREMIUM' && (
          <div className="bg-white flex flex-col items-center p-6 border border-gray-10 rounded-[10px] shadow-lg w-full">
            <span className="text-gray-08 text-body2">
              선택한 구독권: <b>PREMIUM</b>
            </span>

            <span className="text-gray-08 text-body2">
              가격:
              <b> 5,500원</b>
            </span>
          </div>
        )}

        {/* button */}
        <Button
          color={selectedItem === 'PREMIUM' ? 'active' : 'disabled'}
          onClick={handleSubmit}
          className="mb-6 flex-none"
          disabled={selectedItem === 'BASIC'}
        >
          이용권 구매하기
        </Button>
      </div>
    </div>
  );
}
