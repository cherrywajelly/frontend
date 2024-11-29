import React from 'react';
import { ClipLoader } from 'react-spinners';

import { SpinnerProps } from './Spinner.types';

import { clsx } from 'clsx';

/**
 * Spinner 컴포넌트
 *
 * 이 컴포넌트는 로딩 상태를 나타내는 스피너와 메시지를 표시
 * 로딩 중일 때 스피너가 표시되며, 로딩 메시지도 함께 나타낼 수 있습니다.
 *
 * @param {SpinnerProps} props
 * @returns {JSX.Element} - 로딩 스피너 및 메시지를 포함한 JSX 요소
 */
const Spinner = ({
  isLoading,
  className,
  color,
  size,
  message,
  messageStyle,
}: SpinnerProps) => {
  return (
    <div
      data-testid="spinner"
      title="loading..."
      className={clsx(
        'w-full h-full flex flex-col gap-8 justify-center items-center m-auto',
        className,
      )}
    >
      <ClipLoader
        loading={isLoading && true}
        color={color || '#4E4540'}
        size={size}
        speedMultiplier={0.7}
      />
      <div className={messageStyle || 'text-body2'}>
        {message || '잠시만 기다려주세요.'}
      </div>
    </div>
  );
};

export default Spinner;
