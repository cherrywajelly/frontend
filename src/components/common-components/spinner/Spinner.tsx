import React from 'react';
import { ClipLoader } from 'react-spinners';

import { clsx } from 'clsx';

export type SpinnerProps = {
  isLoading?: boolean;
  className?: string;
  color?: string;
  size?: number;
  message?: string;
  messageStyle?: string;
};

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