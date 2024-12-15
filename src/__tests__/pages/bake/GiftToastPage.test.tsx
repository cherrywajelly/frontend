import { usePostGiftToastGroup } from '@/hooks/api/useGiftToast';

import RecoilRootWrapper from '@/app/RecoilRootWrapper';
import GiftToastPage from '@/app/bake/gift-toast/page';
import Providers from '@/app/providers';
import { giftToastStepState } from '@/atoms/toastAtom';
import { render, act, getByRole } from '@testing-library/react';

import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/api/useGiftToast', () => ({
  usePostGiftToastGroup: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
  usePostGiftToastFriend: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
  usePostGiftToastMine: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(() => 0), // mock giftToastStepState value
  useSetRecoilState: jest.fn(),
}));

describe('GiftToastPage', () => {
  const mockRouter = {
    replace: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  const renderPage = () =>
    render(
      <RecoilRootWrapper>
        <Providers>
          <GiftToastPage />
        </Providers>
      </RecoilRootWrapper>,
    );

  it('캡슐 토스트 페이지가 보여져야 한다.', async () => {
    const { container } = renderPage();

    await act(() => expect(container).toHaveTextContent('캡슐 토스트 굽기'));
  });
});
