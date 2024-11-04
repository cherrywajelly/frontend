import { useState } from 'react';
import { CgHome } from 'react-icons/cg';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FiSearch, FiUser } from 'react-icons/fi';
import { PiBellBold } from 'react-icons/pi';

import { bottomBarItemState } from '@/atoms/componentAtom';

import tempImg from '../../../../public/images/timetoast.png';
import { NavItem } from './BottomBar.types';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useRecoilState } from 'recoil';

export const navItem: NavItem[] = [
  { icon: <CgHome />, title: '홈', url: '/' },
  { icon: <FiSearch />, title: '검색', url: '/search' },
  { icon: <FaRegSquarePlus />, title: '토스트', url: '' },
  { icon: <PiBellBold />, title: '알림', url: '/notifications' },
  { icon: <FiUser />, title: '마이페이지', url: '/mypage' },
];

const navVariants = {
  container:
    'fixed bottom-0 bg-white w-full h-[96px] px-6 pt-4 flex justify-between rounded-t-[12px] shadow-[0_0_4px_0px_rgba(78,69,64,0.25)]',
  itemContainer:
    'w-full max-w-[64px] flex flex-col gap-[2px] justify-start items-center',
  textDefault: 'text-body5 text-gray-20',
  iconDefault: 'text-[24px] text-body5 text-gray-20',
  textActive: 'text-navigation1 text-secondary-main',
  iconActive: 'text-[24px] text-navigation1 text-secondary-main',
};
const BottomBar = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(bottomBarItemState);
  const [previousItem, setPreviousItem] = useState(navItem[0]); // 이전 아이템을 저장할 상태

  const router = useRouter();

  const handleClickItem = (item: NavItem) => {
    setPreviousItem(selectedItem);
    setSelectedItem(item);

    if (item.url) {
      router.push(item.url);
    }
  };

  const handleCloseBackdrop = () => {
    setSelectedItem(previousItem);
  };

  return (
    <div className="relative">
      <div className={navVariants.container}>
        {navItem.map((item) => {
          const isActive = selectedItem.title === item.title;
          return (
            <div
              key={item.title}
              className={navVariants.itemContainer}
              onClick={() => handleClickItem(item)}
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

      {selectedItem.title === '토스트' && (
        <div
          className="px-6 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
          onClick={handleCloseBackdrop}
        >
          <div className="w-full max-w-[400px] flex gap-4">
            <div
              className="flex flex-col justify-center text-center bg-white py-4 px-3 shadow-lg w-1/2 rounded-[10px]"
              onClick={(e) => {
                e.stopPropagation();
                router.push('/bake/event-toast');
              }}
            >
              <span className="text-black-main text-body1">
                이벤트토스트 굽기
              </span>
              <Image src={tempImg} alt="" />
              <p className="text-gray-80 text-body4">
                특별한 날을 기념하는 토스트를 구워보세요
              </p>
            </div>
            <div
              className="flex flex-col justify-center text-center bg-white py-4 px-3 shadow-lg w-1/2 rounded-[10px]"
              onClick={(e) => {
                e.stopPropagation();
                router.push('/bake/gift-toast');
              }}
            >
              <span className="text-black-main text-body1">
                선물토스트 굽기
              </span>
              <Image src={tempImg} alt="" />
              <p className="text-gray-80 text-body4">
                추억을 담은 토스트를 물고 당장 뛰쳐나가세요
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
