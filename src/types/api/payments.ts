export interface UserPaymentsRequestBody {
  itemId: number;
  amount: number;
  itemType: string;
  successUrl: string;
  failUrl: string;
}

export interface UserPaymentsResponse {
  paymentId: number;
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail: string;
}

export interface UserPaymentsSuccessRequestBody {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface UserPaymentsResultResponse {
  paymentId: number;
  orderId: string;
}

export interface UserPaymentsFailResponse extends UserPaymentsResultResponse {
  errorMessage: string;
}

export interface UserPaymentsSuccessResponse
  extends UserPaymentsResultResponse {
  orderName: string;
}
