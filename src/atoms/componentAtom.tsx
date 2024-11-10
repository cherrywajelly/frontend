import { CgHome } from 'react-icons/cg';

import { atom } from 'recoil';

export const bottomBarItemState = atom({
  key: 'bottomBarItemState',
  default: {
    icon: <CgHome />,
    title: '홈',
    url: '/',
  },
});
