import {
  useGetNotificationsList,
  useGetMoveNotificationsPage,
} from '@/hooks/api/useFcm';

import RecoilRootWrapper from '@/app/RecoilRootWrapper';
import NotificationsPage from '@/app/notifications/page';
import Providers from '@/app/providers';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/api/useFcm', () => ({
  useGetNotificationsList: jest.fn(),
  useGetMoveNotificationsPage: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('NotificationsPage 컴포넌트', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('알림 페이지 렌더링 시 알림 목록이 조회되어야 한다.', async () => {
    const mockData = [
      {
        fcmId: 1,
        fcmConstant: 'EVENTTOASTSPREAD',
        param: 'event1',
        isOpened: false,
      },
    ];

    (useGetNotificationsList as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      refetch: jest.fn(),
    });

    (useGetMoveNotificationsPage as jest.Mock).mockReturnValue({
      data: null,
      refetch: jest.fn(),
    });

    render(
      <RecoilRootWrapper>
        <Providers>
          <NotificationsPage />
        </Providers>
      </RecoilRootWrapper>,
    );

    const notiListItems = screen.getAllByTestId('noti-list');
    notiListItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(notiListItems.length).toBe(mockData.length);
  });
});
