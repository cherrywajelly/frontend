import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('버튼 컴포넌트', () => {
  it('children이 올바르게 렌더링되는지 확인한다.', () => {
    render(<Button>클릭</Button>);
    const button = screen.getByText('클릭');
    expect(button).toBeInTheDocument();
  });

  it('shape 속성에 따라 올바른 클래스가 적용되는지 확인한다.', () => {
    render(<Button shape="rounded">rounded-full</Button>);
    const button = screen.getByText('rounded-full');
    expect(button).toHaveClass('rounded-full');

    render(<Button shape="square">rounded-[10px]</Button>);
    const squareButton = screen.getByText('rounded-[10px]');
    expect(squareButton).toHaveClass('rounded-[10px]');
  });

  it('color 속성에 따라 올바른 클래스가 적용되는지 확인한다.', () => {
    render(<Button color="primary">primary-main</Button>);
    const button = screen.getByText('primary-main');
    expect(button).toHaveClass('bg-primary-main');

    render(<Button color="secondary">secondary-main</Button>);
    const secondaryButton = screen.getByText('secondary-main');
    expect(secondaryButton).toHaveClass('bg-secondary-main');
  });

  // it('color가 disabled로 설정되었을 때 버튼이 비활성화되는지 확인한다.', () => {
  //   render(<Button color="disabled">비활성 버튼</Button>);
  //   const button = screen.getByText('비활성 버튼');
  //   expect(button).toHaveClass('bg-gray-10');
  //   expect(button).toBeDisabled();
  // });

  it('아이콘이 올바르게 렌더링되는지 확인한다.', () => {
    render(
      <Button
        startIcon={<span data-testid="start-icon">시작</span>}
        endIcon={<span data-testid="end-icon">끝</span>}
      >
        아이콘 버튼
      </Button>,
    );
    const button = screen.getByText('아이콘 버튼');
    const startIcon = screen.getByTestId('start-icon');
    const endIcon = screen.getByTestId('end-icon');

    expect(button).toContainElement(startIcon);
    expect(button).toContainElement(endIcon);
  });
});
