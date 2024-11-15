import { CgHome } from 'react-icons/cg';

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'bottomBarItemState',
  storage: typeof window !== 'undefined' ? localStorage : undefined,
});

export const bottomBarItemState = atom({
  key: 'bottomBarItemState',
  default: {
    icon: <CgHome />,
    title: '홈',
    url: '/home',
  },
  effects_UNSTABLE: [persistAtom],
});
