import { PropsWithChildren, forwardRef } from 'react';

import {
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonSize,
} from './Button.types';

import clsx from 'clsx';

const style: {
  base: string;
  size: Record<ButtonSize, string>;
  shape: Record<ButtonShape, string>;
  color: Record<ButtonColor, string>;
} = {
  base: 'w-full flex items-center justify-center cursor-pointer disabled:cursor-default',
  size: {
    sm: 'h-[32px] px-4 text-body3',
    md: 'h-[48px] px-25 text-body1',
    lg: '',
  },
  shape: {
    square: 'rounded-[10px]',
    rounded: 'rounded-full',
  },
  color: {
    disabled: 'bg-gray-10 text-gray-40 text-body2',
    subDisabled: 'bg-gray-20 text-white',
    active: 'bg-gray-80 text-white',
    primary: 'bg-primary-main text-white',
    secondary: 'bg-secondary-main text-white',
  },
};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (props, ref) => {
    const {
      size = 'md',
      shape = 'square',
      color = 'disabled',
      startIcon,
      endIcon,
      className,
      children,
      ...rest
    } = props;

    return (
      <button
        type="button"
        ref={ref}
        className={clsx(
          style.base,
          style.shape[shape],
          style.size[size],
          style.color[color],
          className,
        )}
        {...rest}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
