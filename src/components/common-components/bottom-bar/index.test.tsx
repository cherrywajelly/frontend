import { render, screen, fireEvent } from '@testing-library/react';

import BottomBar from './BottomBar';

import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('BottomBar', () => {
  const mockedRouterPush = jest.fn();
  beforeEach(() => {
    // 각 tc 시작 전에 mock된 useRouter를 초기화
    (useRouter as jest.Mock).mockReturnValue({
      push: mockedRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('BottomBar 컴포넌트가 렌더링되면 기본값인 "홈"이 나타나야 한다.', () => {
    render(
      <RecoilRoot>
        <BottomBar />
      </RecoilRoot>,
    );

    const activeItem = screen.getByText('홈');
    expect(activeItem).toHaveClass('text-secondary-main');
  });

  test('BottomBar 컴포넌트의 아이템을 클릭하면 활성화되고, URL이 이동되어야 한다.', () => {
    render(
      <RecoilRoot>
        <BottomBar />
      </RecoilRoot>,
    );

    const searchItem = screen.getByText('검색');

    fireEvent.click(searchItem);

    expect(searchItem).toHaveClass('text-secondary-main');
    expect(mockedRouterPush).toHaveBeenCalledWith('/search');
  });

  test('BottomBar가 렌더링되고 "토스트"를 클릭하면 토스트 선택 화면이 나타나야 한다.', () => {
    render(
      <RecoilRoot>
        <BottomBar />
      </RecoilRoot>,
    );

    const toastItem = screen.getByText('토스트');

    fireEvent.click(toastItem);

    const modal = screen.getByText('이벤트토스트 굽기');
    expect(modal).toBeInTheDocument();
  });

  test('토스트 선택 화면이 띄워지면 모달 외부를 클릭하면 모달이 닫혀야 한다.', () => {
    render(
      <RecoilRoot>
        <BottomBar />
      </RecoilRoot>,
    );

    const toastItem = screen.getByText('토스트');
    fireEvent.click(toastItem);
    const modal = screen.getByText('이벤트토스트 굽기');
    expect(modal).toBeInTheDocument();

    // When: 모달 외부 클릭
    fireEvent.click(screen.getByRole('backdropToast'));

    expect(modal).not.toBeInTheDocument();
  });
});

// 1. 모든 네비게이션 항목이, 즉 navItem 배열에 정의된 모든 항목이 화면에 잘 렌더링되는지 확인.

// 2. 선택된 네비게이션 항목 강조 테스트 - 현재 선택된 항목에 적절한 스타일 클래스가 적용되는지 확인.

// 3. 클릭 시 URL로 이동 확인 - 각 네비게이션 항목 클릭 시 올바른 URL로 이동하는지 확인.

// 4. '토스트'를 클릭했을 때 두 가지 옵션('이벤트토스트 굽기', '캡슐토스트 굽기')이 화면에 표시되는지 확인.

// 5. 토스트 메뉴 외부 클릭 시 닫힘 테스트 - 토스트 메뉴가 열린 상태에서 배경 클릭 시 메뉴가 닫히는지 확인.

// 6. 토스트 메뉴 옵션 선택 시 URL 이동 테스트

// 7. 토스트 메뉴 닫힌 후 이전 상태 복원 테스트
