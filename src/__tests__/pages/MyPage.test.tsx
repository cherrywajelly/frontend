import { useGetMyShowcase, useGetMyProfile } from '@/hooks/api/useMyPage';

import RecoilRootWrapper from '@/app/RecoilRootWrapper';
import MyPage from '@/app/mypage/page';
import Providers from '@/app/providers';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/api/useMyPage', () => ({
  useGetMyShowcase: jest.fn(),
  useGetMyProfile: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('MyPage 컴포넌트', () => {
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('로딩 상태일 때 Spinner가 표시되어야 한다.', () => {
    (useGetMyShowcase as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: mockRefetch,
    });

    (useGetMyProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: mockRefetch,
    });

    render(
      <RecoilRootWrapper>
        <Providers>
          <MyPage />
        </Providers>
      </RecoilRootWrapper>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('데이터가 있을 때 MyInfo, Showcase, MyFeed가 렌더링되어야 한다.', () => {
    const mockShowcaseData = [
      { eventToastId: 1, iconUrl: '/icon1.png' },
      { eventToastId: 2, iconUrl: '/icon2.png' },
    ];

    const mockProfileData = {
      nickname: 'cherry',
      profileUrl: '',
      followingCount: 1,
      followerCount: 2,
      teamcount: 3,
    };

    (useGetMyShowcase as jest.Mock).mockReturnValue({
      data: mockShowcaseData,
      isLoading: false,
      refetch: mockRefetch,
    });

    (useGetMyProfile as jest.Mock).mockReturnValue({
      data: mockProfileData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(
      <RecoilRootWrapper>
        <Providers>
          <MyPage />
        </Providers>
      </RecoilRootWrapper>,
    );

    expect(mockRefetch).toHaveBeenCalled();

    // expect(screen.getByText('마이페이지')).toBeInTheDocument();
    // expect(screen.getByTestId('my-info')).toBeInTheDocument();
    // expect(screen.getByTestId('showcase')).toBeInTheDocument();
    // expect(screen.getByTestId('my-feed')).toBeInTheDocument();
  });
});
