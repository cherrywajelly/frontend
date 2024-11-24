import { render, screen } from '@testing-library/react';

import CustomSkeleton from './Skeleton';

describe('CustomSkeleton 컴포넌트', () => {
  test('default props들과 함께 스켈레톤 컴포넌트가 렌더링되어야 한다.', () => {
    render(<CustomSkeleton />);

    const skeleton = screen.getByTestId('custom-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  test('count props가 주어지면 줄 수의 속성으로 알맞게 적용되어야 한다.', () => {
    render(<CustomSkeleton count={3} />);

    const skeletonSpans = document.querySelectorAll('.react-loading-skeleton');
    expect(skeletonSpans).toHaveLength(3);
  });

  test('width와 height 스타일이 알맞게 적용되어야 한다.', () => {
    const width = 100;
    const height = 50;
    render(<CustomSkeleton width={width} height={height} />);

    const skeletonSpan = document.querySelector('.react-loading-skeleton');
    expect(skeletonSpan).toHaveStyle({
      width: `${width}px`,
      height: `${height}px`,
    });
  });

  test('borderRadius 스타일이 알맞게 적용되어야 한다.', () => {
    const borderRadius = 20;
    render(<CustomSkeleton borderRadius={borderRadius} />);

    const skeletonSpan = document.querySelector('.react-loading-skeleton');
    expect(skeletonSpan).toHaveStyle({ borderRadius: `${borderRadius}px` });
  });
});
