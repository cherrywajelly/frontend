import React from 'react';
import { ClipLoader } from 'react-spinners';

import { SpinnerProps } from './Spinner.types';

import { clsx } from 'clsx';

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
