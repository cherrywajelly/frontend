import { useState, useEffect } from 'react';

import ConfirmDialog from '@/components/alert/ConfirmDialog';

import { usePostUserPaymentsFail } from '@/hooks/api/usePayments';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FailArea() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId') as string;

  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timerId = setTimeout(() => {
      if (document.referrer) {
        router.replace(document.referrer); // 이전 페이지로 이동
      } else {
        router.replace('/mypage');
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [router]);

  const { mutate, isPending } = usePostUserPaymentsFail();

  useEffect(() => {
    const init = async () => {
      mutate(orderId, {
        onSuccess: (data) => {
          console.log('data:', data);
        },
        onError: (error) => {
          console.log('Error:', error);
        },
      });

      // window.history.replaceState(null, '', window.location.href);
    };
    init();
  }, [mutate]);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div>
      {isOpen && (
        <ConfirmDialog
          description={
            <>
              <span className="">결제 실패</span>
            </>
          }
          isOpen={isOpen}
          className="!max-w-[400px]"
          onClose={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex flex-col items-center text-gray-80">
            <span className="!text-body2">{code}</span>
            <span className="!text-body2">{message}</span>
            <span className="!text-body2">
              <b>{countdown}</b>초 후 마이페이지로 돌아갑니다.
            </span>
          </div>
        </ConfirmDialog>
      )}
    </div>
  );
}
