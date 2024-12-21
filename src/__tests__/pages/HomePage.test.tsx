import { usePutFCM } from '@/hooks/api/useFcm';

import RecoilRootWrapper from '@/app/RecoilRootWrapper';
import HomePage from '@/app/home/page';
import Providers from '@/app/providers';
import { bottomBarItemState } from '@/atoms/componentAtom';
import ArriveGiftToast from '@/containers/home/ArriveGiftToast';
import { firebaseApp } from '@/firebase';
import { render, screen, act, waitFor } from '@testing-library/react';

import { getMessaging, getToken } from 'firebase/messaging';
import { RecoilRoot } from 'recoil';

jest.mock('@/hooks/api/useFcm', () => ({
  usePutFCM: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('firebase/messaging', () => ({
  getMessaging: jest.fn(),
  getToken: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/api/useFcm', () => ({
  usePutFCM: jest.fn(),
}));

describe('HomePage', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePutFCM as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    (getMessaging as jest.Mock).mockReturnValue({});
    (getToken as jest.Mock).mockResolvedValue('mockFCMToken');
  });

  const renderPage = () =>
    render(
      <RecoilRootWrapper>
        <Providers>
          <HomePage />
        </Providers>
      </RecoilRootWrapper>,
    );

  it('모든 컴포넌트와 함께 홈페이지에가 렌더링되어야 한다.', async () => {
    const { container } = renderPage();

    await act(() => expect(container).toHaveTextContent('TimeToast'));
    await act(() => expect(container).toHaveTextContent('홈'));
  });

  describe('ArriveGiftToast 컴포넌트 렌더링 테스트', () => {
    it('ArriveGiftToast 컴포넌트가 렌더링되어야 한다', async () => {
      render(
        <RecoilRootWrapper>
          <Providers>
            <ArriveGiftToast />
          </Providers>
        </RecoilRootWrapper>,
      );

      expect(screen.getByRole('status')).toBeInTheDocument();

      // 토스트가 있을 경우 '도착한 토스트' 문구가 포함되어 있는지 확인한다.
      await waitFor(() =>
        expect(screen.getByText(/도착한 토스트/)).toBeInTheDocument(),
      );

      // 토스트가 없을 경우 다른 문구가 나타나는지 확인한다.
      await waitFor(() =>
        expect(screen.getByText(/도착한 토스트가 없어요/)).toBeInTheDocument(),
      );
    });
  });

  it('FCM permission을 요청하고 토큰을 받아와야 한다.', async () => {
    global.Notification = {
      requestPermission: jest.fn().mockResolvedValue('granted'),
    } as any;

    await act(async () => {
      renderPage();
    });

    expect(Notification.requestPermission).toHaveBeenCalled();
    expect(getToken).toHaveBeenCalledWith(expect.any(Object), {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
  });

  //   it('calls mutateFCM with the fetched token', async () => {
  //     const mockMutate = jest.fn();
  //     const mockFCMToken = 'mockFCMToken';

  //     (usePutFCM as jest.Mock).mockReturnValue({
  //       mutate: mockMutate,
  //       isPending: false,
  //     });

  //     global.Notification = {
  //       requestPermission: jest.fn().mockResolvedValue('granted'),
  //     } as any;

  //     await act(async () => {
  //       renderPage();
  //     });
  //     expect(mockMutate).toHaveBeenCalledWith(mockFCMToken, expect.any(Object));
  //   });
});
