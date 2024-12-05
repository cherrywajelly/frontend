import { useNicknameSignUp, useNicknameValid } from '@/hooks/api/useSignUp';

import SignUpPage from '@/app/sign-up/page';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useRouter } from 'next/navigation';

jest.mock('@/hooks/api/useSignUp');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpPage', () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockRefetch = jest.fn();
  const mockMutateNicknameSignUp = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });

    (useNicknameValid as jest.Mock).mockReturnValue({
      refetch: mockRefetch,
      isLoading: false,
      data: null,
    });

    (useNicknameSignUp as jest.Mock).mockReturnValue({
      mutate: mockMutateNicknameSignUp,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('닉네임 입력 및 중복 확인 버튼이 활성화되어야 한다.', () => {
    render(<SignUpPage />);

    const input = screen.getByPlaceholderText('닉네임을 입력해주세요.');
    const checkButton = screen.getByText('중복확인');

    expect(input).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    fireEvent.change(input, { target: { value: '닉네임테스트' } });
    expect(checkButton).not.toBeDisabled();
  });

  test('닉네임 유효성 검사가 실패되어야 한다.', async () => {
    render(<SignUpPage />);

    const input = screen.getByPlaceholderText('닉네임을 입력해주세요.');
    const checkButton = screen.getByText('중복확인');

    fireEvent.change(input, {
      target: { value: '안녕이건유효하지않은닉네임' },
    }); // 유효하지 않은 닉네임

    fireEvent.click(checkButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          '닉네임은 1자 이상 10자 이하의 한글, 영문 또는 숫자 조합만 가능합니다.',
        ),
      ).toBeInTheDocument(),
    );
  });

  test('닉네임 중복 확인이 성공되어야 한다.', async () => {
    mockRefetch.mockResolvedValue({
      status: 'success',
    });

    render(<SignUpPage />);

    const input = screen.getByPlaceholderText('닉네임을 입력해주세요.');
    const checkButton = screen.getByText('중복확인');

    fireEvent.change(input, { target: { value: '유효한닉네임' } }); // 유효한 닉네임

    fireEvent.click(checkButton);

    await waitFor(() =>
      expect(screen.getByText('사용 가능한 닉네임입니다.')).toBeInTheDocument(),
    );
  });

  test('닉네임 중복 확인이 실패되어야 한다.', async () => {
    mockRefetch.mockResolvedValue({
      status: 'error',
      error: { message: '이미 사용 중인 닉네임입니다.' },
    });

    render(<SignUpPage />);

    const input = screen.getByPlaceholderText('닉네임을 입력해주세요.');
    const checkButton = screen.getByText('중복확인');

    fireEvent.change(input, { target: { value: '중복닉네임' } }); // 중복된 닉네임

    fireEvent.click(checkButton);

    await waitFor(() =>
      expect(
        screen.getByText('이미 사용 중인 닉네임입니다.'),
      ).toBeInTheDocument(),
    );
  });
});
