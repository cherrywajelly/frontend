import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SkeletonStyleProps } from '.';

export interface SkeletonProps extends SkeletonStyleProps {
  count?: number;
  className?: string;
  containerClassName?: string;
}

/**
 * CustomSkeleton 컴포넌트
 *
 * `react-loading-skeleton` 라이브러리를 사용하여 로딩 스켈레톤을 커스터마이징하는 컴포넌트
 * 이 컴포넌트는 로딩 중에 표시될 다양한 형태의 스켈레톤 UI를 생성할 수 있습니다.
 *
 * @param {number} [count=1] - 생성할 스켈레톤 항목의 수 (기본값: 1)
 * @param {string} [className] - 추가적인 CSS 클래스
 * @param {string} [containerClassName] - 컨테이너 div에 적용할 클래스
 * @param {number | string} [width] - 스켈레톤의 너비
 * @param {number | string} [height] - 스켈레톤의 높이
 * @param {number} [borderRadius=10] - 스켈레톤의 테두리 둥글기 (기본값: 10)
 * @returns {JSX.Element} - 로딩 스켈레톤 컴포넌트
 */
export const CustomSkeleton = ({
  count = 1,
  className,
  containerClassName,
  width,
  height,
  borderRadius = 10,
}: SkeletonProps) => {
  return (
    <div className={containerClassName} data-testid="custom-skeleton">
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
        <Skeleton
          count={count}
          width={width}
          height={height}
          borderRadius={borderRadius}
          className={className}
        />
      </SkeletonTheme>
    </div>
  );
};

export default CustomSkeleton;
