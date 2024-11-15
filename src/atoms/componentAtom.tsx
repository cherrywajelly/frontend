import { CgHome } from 'react-icons/cg';

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'bottomBarItemState',
  storage: localStorage,
});

export const bottomBarItemState = atom({
  key: 'bottomBarItemState',
  default: {
    icon: <CgHome />,
    title: '홈',
    url: '/',
  },
  effects_UNSTABLE: [persistAtom],
});
