'use client';

import { useState } from 'react';
import { BiDollarCircle } from 'react-icons/bi';

import Button from '@/components/common-components/button';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import {
  useGetIconGroupsDetail,
  usePostBuyIconGroups,
} from '@/hooks/api/useIconGroups';
import { usePostUserPayments } from '@/hooks/api/usePayments';
import { requestTossPayments } from '@/utils/payments';
import { notifySuccess } from '@/utils/toast';

import Image from 'next/image';

type PageParams = {
  iconGroupId: number;
};

export default function IconDetailPage({ params }: { params: PageParams }) {
  const iconGroupId = params.iconGroupId;

  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
  const originUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const { data, isLoading } = useGetIconGroupsDetail(iconGroupId);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const { mutate, isPending } = usePostBuyIconGroups();

  const { mutate: mutateUserPayments, isPending: isPendingUserPayments } =
    usePostUserPayments();

  const handleSubmit = () => {
    if (data) {
      mutateUserPayments(
        {
          itemId: iconGroupId,
          amount: data.price,
          itemType: 'ICON',
          successUrl: `${originUrl}/api/v1/payments/success`,
          failUrl: `${originUrl}/api/v1/payments/fail`,
        },
        {
          onSuccess: (responseData) => {
            console.log(responseData);
            requestTossPayments({
              amount: data.price,
              orderId: responseData.orderId,
              orderName: responseData.orderName,
              customerName: responseData.customerEmail,
              successUrl: responseData.successUrl,
              failUrl: responseData.failUrl,
            });
          },
        },
      );
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar title="아이콘 마켓" />

      <div className="h-[calc(100vh-48px)] bg-white flex flex-col gap-6 justify-between bg-gray-white p-6">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="h-full flex flex-col items-center">
            {/* info */}
            <div className="flex flex-col justify-center items-center">
              <Image
                src={data?.thumbnailImageUrl ?? ''}
                alt=""
                width={120}
                height={120}
                className="w-[120px] h-[120px] object-cover rounded-[10px]"
              />
              <span className="mt-6 text-black-main text-body1">
                {data?.title}
              </span>
              <span className="mt-2 text-gray-80 text-body4 ">
                {data?.creatorNickname}
              </span>
              <span className="mt-2 text-gray-80 text-body4 flex items-center gap-1">
                <BiDollarCircle />
                {data?.price}
              </span>
            </div>

            {/* icon */}
            <div className="mt-6 w-full h-full grid grid-cols-3 gap-x-4 gap-y-6">
              {data &&
                data?.iconResponses &&
                data.iconResponses.map((icon) => (
                  <div
                    key={icon.iconId}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={icon.iconImageUrl}
                      alt={icon.iconId.toString()}
                      width={100}
                      height={100}
                      className="cursor-pointer w-[100px] h-[100px] object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
        <Button
          size="md"
          className="flex-none mb-6"
          color={isPurchased || isPending ? 'disabled' : 'active'}
          onClick={handleSubmit}
          disabled={isPurchased || isPending}
        >
          {isPurchased ? '구매완료' : '구매하기'}
        </Button>
      </div>
    </div>
  );
}
