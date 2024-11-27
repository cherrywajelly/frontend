'use client';

import DialogMain from './Dialog';
import DialogDescription from './DialogDescription';
import DialogFooter from './DialogFooter';
import DialogTitle from './DialogTitle';

export * from './DialogContext';

export const Dialog = Object.assign(DialogMain, {
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
});
