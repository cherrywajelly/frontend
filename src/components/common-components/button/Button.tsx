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
  base: 'inline-flex items-center justify-center cursor-pointer disabled:cursor-default',
  size: {
    sm: 'h-[32px] px-4 text-body3',
    md: 'h-[48px] px-25 text-body1',
    lg: 'h-[56px] px-4 text-body3 w-auto whitespace-nowrap',
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

/**
 * Button 컴포넌트
 * 다양한 크기, 모양, 색상으로 커스터마이징할 수 있는 버튼 컴포넌트
 * 버튼의 크기, 색상, 모양을 선택할 수 있으며, 시작 및 종료 아이콘을 추가할 수 있습니다.
 *
 * @param {ButtonProps} props - 버튼에 전달되는 props
 * @param {React.Ref<HTMLButtonElement>} ref - 버튼의 ref
 *
 * @returns {JSX.Element} Button 컴포넌트
 */
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
      disabled,
      onClick,
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
        // disabled={color === 'disabled' || disabled}
        onClick={onClick}
        disabled={disabled}
        {...rest}
        disabled={disabled}
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
