import { useState } from 'react';
import { CgHome } from 'react-icons/cg';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FiSearch, FiUser } from 'react-icons/fi';
import { PiBellBold } from 'react-icons/pi';

import { NavItem } from './BottomBar.types';

import clsx from 'clsx';

const navItem: NavItem[] = [
  { icon: <CgHome />, title: '홈' },
  { icon: <FiSearch />, title: '검색' },
  { icon: <FaRegSquarePlus />, title: '토스트' },
  { icon: <PiBellBold />, title: '알림' },
  { icon: <FiUser />, title: '마이페이지' },
];

const navVariants = {
  container:
    'fixed bottom-0 bg-white w-full h-[96px] px-6 pt-4 flex justify-between rounded-t-[12px] shadow-[0_0_4px_0px_rgba(78,69,64,0.25)]',
  itemContainer:
    'w-full max-w-[64px] flex flex-col gap-[2px] justify-start items-center',
  textDefault: 'text-body4 text-gray-20',
  iconDefault: 'text-[24px] text-body4 text-gray-20',
  textActive: 'text-navigation1 text-secondary-main',
  iconActive: 'text-[24px] text-navigation1 text-secondary-main',
};

const BottomBar = () => {
  const [selectedItem, setSelectedItem] = useState<NavItem>(navItem[0]);

  return (
    <div className={navVariants.container}>
      {navItem.map((item) => {
        const isActive = selectedItem === item;
        return (
          <div
            key={item.title}
            className={navVariants.itemContainer}
            onClick={() => setSelectedItem(item)}
          >
            <div
              className={clsx(
                isActive ? navVariants.iconActive : navVariants.iconDefault,
              )}
            >
              {item.icon}
            </div>
            <div
              className={clsx(
                isActive ? navVariants.textActive : navVariants.textDefault,
              )}
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomBar;
