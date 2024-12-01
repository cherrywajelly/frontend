'use client';

import DialogMain from './Dialog';
import DialogDescription from './DialogDescription';
import DialogFooter from './DialogFooter';
import DialogTitle from './DialogTitle';

export * from './DialogContext';

/**
 * Dialog 컴포넌트
 *
 * 다양한 하위 컴포넌트 (`Title`, `Description`, `Footer`) 를 포함하는 다이얼로그 모달 컴포넌트
 * 모달의 열기/닫기를 관리하고, 여러 시각적 변형(배경 흐림, 애니메이션 등)을 지원합니다.
 *
 * @component
 * @example
 * <Dialog open={isOpen} onClose={handleClose}>
 *   <Dialog.Title>Title</Dialog.Title>
 *   <Dialog.Description>Description goes here.</Dialog.Description>
 *   <Dialog.Footer>Footer content</Dialog.Footer>
 * </Dialog>
 */
export const Dialog = Object.assign(DialogMain, {
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
});
