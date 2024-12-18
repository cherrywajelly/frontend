import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import defaultImg from '../../public/images/default-toast.png';
import defaultJam from '../../public/images/defaultJam.png';

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
    toastDescription: '',
    deco: defaultImg,
    iconId: null,
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
    toastDescription: '',
    deco: defaultImg,
    type: null,
    iconId: null,
  },
});

export const jamStepState = atom<number>({
  key: `jamStepState`,
  default: 0,
});

export const jamDataState = atom<pieceData | ToastData>({
  key: 'jamDataState',
  default: {
    deco: defaultJam,
    title: '',
    contents: '',
    imgList: [],
    iconId: null,
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
    iconId: null,
    title: '',
    contents: '',
    imgList: [],
    submitAble: false,
  },
});
