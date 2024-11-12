import { StaticImageData } from 'next/image';

export interface ToastData {
  isAgree?: boolean;
  memoryDate?: Date | null;
  openDate?: Date | null;
  toastName?: string;
  deco: StaticImageData | string | null;
  id?: number | null;
  type?: 'mine' | 'friend' | 'group' | null;
  submitAble?: boolean;
  title?: string;
  contents?: string;
  imgList?: File[];
}

export interface pieceData {
  deco: StaticImageData | string | null;
  title: string;
  contents: string;
  imgList?: File[];
  submitAble?: boolean;
}
