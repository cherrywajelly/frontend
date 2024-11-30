import {
  UserPaymentsFailResponse,
  UserPaymentsRequestBody,
  UserPaymentsResponse,
  UserPaymentsSuccessRequestBody,
  UserPaymentsSuccessResponse,
} from '@/types/api/payments';

import { apiRequest } from '.';

// 사용자 결제 정보 저장
export const postUserPayments = async ({
  itemId,
  amount,
  itemType,
  successUrl,
  failUrl,
}: UserPaymentsRequestBody) => {
  const response = await apiRequest<UserPaymentsResponse>(
    `/api/v1/payments`,
    'POST',
    {
      itemId,
      amount,
      itemType,
      successUrl,
      failUrl,
    },
  );

  if (response.status === 500) {
    throw new Error('Internal Server Error');
  }

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }

  throw new Error('Unexpected response status');
};

// 결제 성공 승인 요청
export const postUserPaymentsSuccess = async (
  item: UserPaymentsSuccessRequestBody,
): Promise<UserPaymentsSuccessResponse> => {
  try {
    const res = await apiRequest(`/api/v1/payments/success`, 'POST', {
      paymentKey: item.paymentKey,
      orderId: item.orderId,
      amount: item.amount,
    });

    if (res.status === 500) {
      throw new Error('Internal Server Error');
    }

    if (res.status === 200) {
      return res.json();
    }

    throw new Error('Unexpected response status');
  } catch (err) {
    throw err;
  }
};

// 결제 실패 요청
export const postUserPaymentsFail = async (
  orderId: string,
): Promise<UserPaymentsFailResponse> => {
  const response = await apiRequest(
    `/api/v1/payments/fail?orderId=${orderId}`,
    'POST',
  );

  if (response.status === 500) {
    throw new Error('Internal Server Error');
  }

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }

  throw new Error('Unexpected response status');
};
