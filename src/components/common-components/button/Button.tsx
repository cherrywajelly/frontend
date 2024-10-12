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
  base: 'w-full h-[48px] flex items-center justify-center cursor-pointer disabled:cursor-default',
  size: {
    sm: '',
    md: 'px-25 ',
    lg: '',
  },
  shape: {
    square: 'rounded-[10px]',
    rounded: 'rounded-full',
  },
  color: {
    active: 'text-white',
    default: 'bg-gray-80 text-white text-body2',
    disabled: 'bg-gray-10 text-gray-60 text-body2',
  },
};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (props, ref) => {
    const {
      size = 'md',
      shape = 'square',
      color = 'default',
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
