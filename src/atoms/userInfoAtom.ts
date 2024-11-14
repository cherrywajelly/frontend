import { atom } from 'recoil';

export const nicknameState = atom<string>({
  key: `nickname`,
  default: '',
});

export const memberIdState = atom<number | null>({
  key: `memberId`,
  default: null,
});
