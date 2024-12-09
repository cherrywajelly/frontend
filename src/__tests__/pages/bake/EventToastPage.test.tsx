import { usePostEventToast } from '@/hooks/api/useEventToast';

import EventToastPage from '@/app/bake/event-toast/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

jest.mock('@/hooks/api/useEventToast', () => ({
  usePostEventToast: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('이벤트 토스트 생성 페이지 테스트', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      back: mockBack,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('이벤트 토스트 페이지가 정상적으로 렌더링된다.', () => {
    render(
      <RecoilRoot>
        <EventToastPage />
      </RecoilRoot>,
    );

    expect(screen.getByText('이벤트 토스트 굽기')).toBeInTheDocument();

    // expect(screen.getByText(/날짜를 설정하세요/)).toBeInTheDocument();
  });

  test('다음 스텝으로 이동한다.', () => {
    render(
      <RecoilRoot>
        <EventToastPage />
      </RecoilRoot>,
    );

    // 다음 스텝으로 이동 (EventToastOpenDateForm -> EventToastNameForm)
    const nextButton = screen.getByRole('button', { name: /다음/ });
    fireEvent.click(nextButton);

    // expect(screen.getByText(/이름을 설정하세요/)).toBeInTheDocument();
  });

  //   test('토스트 생성 버튼을 눌렀을 때 API 요청이 호출되며 토스트가 생성되어야 한다.', async () => {
  //     const mockMutate = jest.fn();
  //     (usePostEventToast as jest.Mock).mockReturnValue({
  //       mutate: mockMutate,
  //       isPending: false,
  //     });

  //     render(
  //       <RecoilRoot>
  //         <EventToastPage />
  //       </RecoilRoot>,
  //     );

  //     // 마지막 스텝으로 이동
  //     fireEvent.click(screen.getByRole('button', { name: /다음/ })); // Step 1 -> Step 2
  //     fireEvent.click(screen.getByRole('button', { name: /다음/ })); // Step 2 -> Step 3

  //     const submitButton = screen.getByRole('button', { name: /토스트 생성/ });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(mockMutate).toHaveBeenCalledTimes(1);
  //     });
  //   });

  //   test('성공적으로 이벤트 토스트 생성 후 공유 페이지로 이동한다.', async () => {
  //     const mockMutate = jest.fn((_, options) => {
  //       options.onSuccess({ id: 123 });
  //     });
  //     (usePostEventToast as jest.Mock).mockReturnValue({
  //       mutate: mockMutate,
  //       isPending: false,
  //     });

  //     render(
  //       <RecoilRoot>
  //         <EventToastPage />
  //       </RecoilRoot>,
  //     );

  //     // 마지막 스텝으로 이동
  //     fireEvent.click(screen.getByRole('button', { name: /다음/ })); // Step 1 -> Step 2
  //     fireEvent.click(screen.getByRole('button', { name: /다음/ })); // Step 2 -> Step 3

  //     // 제출 버튼 클릭
  //     const submitButton = screen.getByRole('button', { name: /토스트 생성/ });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       // 성공 메시지 확인
  //       expect(
  //         screen.getByText(/이벤트 토스트가 생성되었어요/),
  //       ).toBeInTheDocument();

  //       // 공유 버튼 클릭
  //       const shareButton = screen.getByRole('button', { name: /공유하기/ });
  //       fireEvent.click(shareButton);

  //       expect(mockReplace).toHaveBeenCalledWith('/event-toast/123/share');
  //     });
  //   });

  //   test('취소 버튼 클릭 시 홈으로 이동한다.', async () => {
  //     const mockMutate = jest.fn((_, options) => {
  //       options.onSuccess({ id: 123 });
  //     });
  //     (usePostEventToast as jest.Mock).mockReturnValue({
  //       mutate: mockMutate,
  //       isPending: false,
  //     });

  //     render(
  //       <RecoilRoot>
  //         <EventToastPage />
  //       </RecoilRoot>,
  //     );

  //     // 마지막 스텝으로 이동
  //     fireEvent.click(screen.getByRole('button', { name: /다음/ })); // Step 1 -> Step 2
  //     fireEvent.click(screen.getByRole('button', { name: /다음/ })); // Step 2 -> Step 3

  //     // 제출 버튼 클릭
  //     const submitButton = screen.getByRole('button', { name: /제출/ });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       // 취소 버튼 클릭
  //       const homeButton = screen.getByRole('button', { name: /홈으로 가기/ });
  //       fireEvent.click(homeButton);

  //       expect(mockReplace).toHaveBeenCalledWith('/home');
  //     });
  //   });
});
