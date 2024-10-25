import { forwardRef, PropsWithChildren, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import { InputProps, InputSize } from './Input.types';

import clsx from 'clsx';

const style: {
  base: string;
  sizes: Record<InputSize, string>;
} = {
  base: 'border border-gray-10 placeholder:text-gray-60 rounded-[10px] text-body2',
  sizes: {
    sm: 'w-full h-[40px] px-3 py-2 focus:outline-none bg-gray-10', // to use in search view
    md: 'w-full h-[56px] p-4 focus:outline-primary-main', // to use in normal input field
  },
};

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  (props, ref) => {
    const {
      onChange,
      placeholder,
      onKeyDown,
      defaultValue = '',
      size = 'md',
      className,
      search,
      startIcon,
      ...rest
    } = props;

    const [value, setValue] = useState(defaultValue);

    return (
      <div className="relative w-full">
        {search ? (
          <IoIosSearch
            className={clsx(
              'text-[24px] absolute top-[8px] left-[12px] text-gray-20',
            )}
          />
        ) : (
          <div
            className={clsx(
              'text-[24px] absolute top-[16px] left-[16px] text-gray-20',
              value ? 'text-gray-80' : 'text-gray-60',
            )}
          >
            {startIcon}
          </div>
        )}
        <input
          value={value}
          onChange={(e) => {
            onChange?.(e);
            setValue(e.target.value);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          ref={ref}
          className={clsx(
            search && 'pl-10',
            startIcon !== undefined && 'pl-12',
            className,
            style.base,
            style.sizes[size as InputSize],
          )}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
