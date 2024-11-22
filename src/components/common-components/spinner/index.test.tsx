import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner 컴포넌트', () => {
  it('로딩 중일 때 스피터가 나타나야 한다.', () => {
    render(<Spinner isLoading={true} />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('title', 'loading...');

    expect(screen.getByText('잠시만 기다려주세요.')).toBeInTheDocument();
  });

  it('isLoading이 false이면 렌더링되지 않아야 한다.', () => {
    render(<Spinner isLoading={false} />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).not.toContainHTML('ClipLoader');
  });

  it('메시지 props가 있는 경우 메시지가 함께 보여져야 한다.', () => {
    const customMessage = '로딩 중입니다!!!!...';
    render(<Spinner isLoading={true} message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
