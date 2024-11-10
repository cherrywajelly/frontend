import { StaticImageData } from 'next/image';

export interface ToastData {
  isAgree?: boolean;
  memoryDate?: Date | null;
  openDate?: Date | null;
  toastName?: string;
  deco: StaticImageData | string | null;
  id?: number | null;
  type?: 'mine' | 'friend' | 'group' | null;
}

export interface pieceData {
  deco: StaticImageData | string | null;
  title: string;
  contents: string;
  imgList?: string[];
}
