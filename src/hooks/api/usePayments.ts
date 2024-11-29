import {
  UserPaymentsFailResponse,
  UserPaymentsRequestBody,
  UserPaymentsResponse,
  UserPaymentsSuccessRequestBody,
  UserPaymentsSuccessResponse,
} from '@/types/api/payments';

import {
  postUserPayments,
  postUserPaymentsFail,
  postUserPaymentsSuccess,
} from '@/api/payments';
import { useMutation } from '@tanstack/react-query';

import { error } from 'console';

// 사용자 결제 정보 저장
export const usePostUserPayments = () => {
  const { mutate, isPending, error } = useMutation<
    UserPaymentsResponse,
    Error,
    UserPaymentsRequestBody
  >({
    mutationFn: (item: UserPaymentsRequestBody) => postUserPayments(item),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Payment failed:', error.message);
    },
  });

  return { mutate, isPending, error };
};

// 결제 성공 승인 요청
export const usePostUserPaymentsSuccess = () => {
  const { mutate, isPending, error } = useMutation<
    UserPaymentsSuccessResponse,
    Error,
    UserPaymentsSuccessRequestBody
  >({
    mutationFn: (item: UserPaymentsSuccessRequestBody) =>
      postUserPaymentsSuccess(item),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Payment failed:', error.message);
    },
  });

  return { mutate, isPending, error };
};

// 결제 실패 요청
export const usePostUserPaymentsFail = () => {
  const { mutate, isPending, error } = useMutation<
    UserPaymentsFailResponse,
    Error,
    string
  >({
    mutationFn: (orderId: string) => postUserPaymentsFail(orderId),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Payment failed:', error.message);
    },
  });

  return { mutate, isPending, error };
};
