import {
  loadTossPayments,
  TossPaymentsInstance,
} from '@tosspayments/payment-sdk';

/**
 * Toss Payments 결제 요청 함수
 *
 * @param options - 결제 요청에 필요한 옵션
 * @param options.amount - 결제 금액
 * @param options.orderId - 주문 ID
 * @param options.orderName - 상품명
 * @param options.customerName - 고객명
 * @param options.successUrl - 성공 시 리다이렉션 URL
 * @param options.failUrl - 실패 시 리다이렉션 URL
 */
export const requestTossPayments = async (options: {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
}): Promise<void> => {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY as string;

  try {
    const tossPayments: TossPaymentsInstance =
      await loadTossPayments(clientKey);

    await tossPayments.requestPayment('카드', options);
  } catch (error: any) {
    // Error 처리
    if (error.code === 'USER_CANCEL') {
      console.error('사용자가 결제를 취소했습니다.');
    } else if (error.code === 'INVALID_CARD_COMPANY') {
      console.error('유효하지 않은 카드 코드입니다.');
    } else {
      console.error('결제 처리 중 예상치 못한 오류가 발생했습니다.', error);
    }

    throw error; // 필요에 따라 에러를 호출자로 전달
  }
};
