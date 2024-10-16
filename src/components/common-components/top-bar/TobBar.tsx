import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

import { TopBarProps } from './TopBar.types';

import clsx from 'clsx';

const variants = {
  base: 'text-body1',
  disabled: 'text-gray-20',
  active: 'text-secondary-main',
};

const TopBar = ({
  title = 'TimeToast',
  isBackBtn = true,
  isRight,
  submitAble = false,
}: TopBarProps) => {
  const [isActive, setIsActive] = useState<boolean>(submitAble ?? false);

  return (
    <div className="w-full h-[48px] border-b border-gray-10 px-6 flex justify-between items-center">
      {isBackBtn ? (
        <IoIosArrowBack size={20} className="text-black-main" />
      ) : (
        <></>
      )}
      <div className="text-body2 text-black-main">{title}</div>
      {isRight === 'hamburger' ? (
        <RxHamburgerMenu size={20} className="text-black-main" />
      ) : (
        <span
          className={clsx(
            variants.base,
            isActive ? variants.active : variants.disabled,
          )}
        >
          등록
        </span>
      )}
    </div>
  );
};

export default TopBar;
