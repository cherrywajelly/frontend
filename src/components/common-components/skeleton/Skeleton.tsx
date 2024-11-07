import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SkeletonStyleProps } from '.';

export interface SkeletonProps extends SkeletonStyleProps {
  count?: number;
  className?: string;
}

export const CustomSkeleton = ({
  count = 1,
  className,
  width,
  height,
  borderRadius = 10,
}: SkeletonProps) => {
  return (
    <div className="">
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
