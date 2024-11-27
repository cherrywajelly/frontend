import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';

import TopBar from './TobBar';

import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('TopBar 컴포넌트', () => {
  const mockRouter = { back: jest.fn(), push: jest.fn() };
  const handleSubmitMock = jest.fn();
  const onBackMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  test('기본 타이틀이 보여져야 한다.', () => {
    render(<TopBar />);
    expect(screen.getByText('TimeToast')).toBeInTheDocument();
  });

  test('back 버튼을 렌더링하고 클릭하면 router.back()을 트리거해야 한다.', () => {
    render(<TopBar />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  test('submit버튼이 클릭되면 handleSubmit이 호출되어야 한다.', async () => {
    render(
      <TopBar
        isRight={true}
        submitAble={true}
        handleSubmit={handleSubmitMock}
      />,
    );
    const submitButton = screen.getByText('등록');

    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  test('isPending이 true일 때는 submit 버튼이 비활성화되어야 한다.', () => {
    render(<TopBar isRight={true} submitAble={true} isPending={true} />);
    const submitButton = screen.getByText('등록');
    expect(submitButton).toBeDisabled();
  });
});
