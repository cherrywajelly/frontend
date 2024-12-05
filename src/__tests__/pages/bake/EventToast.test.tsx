import { usePostEventToast } from '@/hooks/api/useEventToast';

import EventToastPage from '@/app/bake/event-toast/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

jest.mock('@/hooks/api/useEventToast', () => ({
  usePostEventToast: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

describe('이벤트 토스트 생성페이지 테스트', () => {
  beforeEach(() => {
    (usePostEventToast as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  test('처음엔 초기 폼이 렌더링되어야 하고, 스텝별로 화면이 바뀌어야 한다.', async () => {
    render(
      <RecoilRoot>
        <EventToastPage />
      </RecoilRoot>,
    );
  });

  test('이벤트 토스트가 성공적으로 생성되어야 한다.', async () => {
    const mockMutate = jest.fn((_, { onSuccess }) => onSuccess());
    (usePostEventToast as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(
      <RecoilRoot>
        <EventToastPage />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getByText('다음')); // Step 1
    fireEvent.click(screen.getByText('다음')); // Step 2

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Toast' },
    });

    const input = screen.getByPlaceholderText('토스트 이름을 입력해주세요.');
    fireEvent.change(input, {
      target: { value: '토스트테스트닉네임' },
    });

    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: '2024-12-01' },
    });

    fireEvent.click(screen.getByText('등록'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          iconId: expect.any(Number),
          openedDate: expect.any(String),
          title: 'Test Toast',
        },
        expect.any(Object),
      );
    });

    expect(
      screen.getByText('이벤트 토스트가 생성되었어요!'),
    ).toBeInTheDocument();
  });
});
