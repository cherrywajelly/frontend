'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import { DropdownProps } from './Dropdown.types';

import clsx from 'clsx';

const variants = {
  base: 'absolute mt-2 rounded-[10px] whitespace-nowrap shadow-lg z-10 text-gray-80 bg-white text-left',
  sizes: {
    sm: 'px-3 py-2 text-body3',
    md: 'px-5 py-3 text-body1',
  },
  position: {
    left: 'right-0',
    center: 'flex justify-center',
  },
};

export default function Dropdown({
  items,
  size = 'md',
  position = 'left',
  color = 'text-gray-20',
}: DropdownProps) {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const toggleDropdown = () => {
    setIsOpenCategory(!isOpenCategory);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenCategory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button onClick={toggleDropdown} className="flex items-center">
        <IoIosMore size={24} className={color} />
      </button>

      {isOpenCategory && (
        <div
          className={clsx(
            variants.base,
            variants.sizes[size],
            variants.position[position],
          )}
        >
          <ul className="flex flex-col p-1 gap-6">
            {items.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  item.onClick();
                  setIsOpenCategory(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
