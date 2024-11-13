import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import defaultImg from '../../public/images/default-toast.png';

import { StaticImageData } from 'next/image';
import { atom } from 'recoil';

export const eventToastStepState = atom<number>({
  key: `eventToastStepState`,
  default: 0,
});

export const eventToastDataState = atom<ToastData>({
  key: 'eventToastDataState',
  default: {
    openDate: null,
    toastName: '',
    deco: defaultImg,
  },
});

export const giftToastStepState = atom<number>({
  key: `giftToastStepState`,
  default: 0,
});

export const giftToastDataState = atom<ToastData>({
  key: 'giftToastDataState',
  default: {
    id: null,
    isAgree: false,
    memoryDate: null,
    openDate: null,
    toastName: '',
    deco: defaultImg,
    type: null,
  },
});

export const jamStepState = atom<number>({
  key: `jamStepState`,
  default: 0,
});

export const jamDataState = atom<pieceData | ToastData>({
  key: 'jamDataState',
  default: {
    deco: defaultImg,
    title: '',
    contents: '',
    imgList: [],
  },
});

export const toastPieceStepState = atom<number>({
  key: `toastPieceStepState`,
  default: 0,
});

export const toastPieceDataState = atom<pieceData | ToastData>({
  key: 'toastPieceDataState',
  default: {
    deco: defaultImg,
    title: '',
    contents: '',
    imgList: [],
    submitAble: false,
  },
});
