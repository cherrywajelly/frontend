import React from 'react';

import tempImg from '../../../public/images/timetoast.png';
import { Dialog } from '../common-components/dialog';

import clsx from 'clsx';
import Image from 'next/image';

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

/**
 * ConfirmDialog 컴포넌트
 * 사용자가 확인 및 취소와 같은 동작을 할 수 있도록 하는 다이얼로그 컴포넌트
 * 제목과 설명을 입력할 수 있으며, 다이얼로그 내부에 자식 요소도 포함할 수 있습니다.
 *
 * @param {boolean} isOpen - 다이얼로그의 open 상태
 * @param {function} onClose - 다이얼로그가 닫힐 때 호출되는 함수
 * @param {string} [title] - 다이얼로그의 제목
 * @param {string} [description] - 다이얼로그에 표시될 설명 텍스트
 * @param {React.ReactNode} [children] - 다이얼로그의 하단에 표시될 자식 요소
 * @param {string} [className] - 다이얼로그의 추가적인 stye 지정
 *
 * @returns {JSX.Element} ConfirmDialog 컴포넌트
 */
export default function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      className={clsx(props.className, 'max-w-[400px]')}
    >
      <Dialog.Title className="">{props.title}</Dialog.Title>
      <Dialog.Description className="flex flex-col items-center">
        <Image src={tempImg} alt="" width={120} height={120} />
        {props.description}
      </Dialog.Description>
      <Dialog.Footer className="">{props.children}</Dialog.Footer>
    </Dialog>
  );
}
