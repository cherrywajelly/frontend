import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { DialogProps } from './Dialog.types';
import { DialogProvider } from './DialogContext';

import clsx from 'clsx';

export const variants = {
  container:
    'p-[24px] w-full shadow-lg rounded-[20px] overflow-hidden flex flex-col ml-auto mr-auto bg-white border border-gray-10',
  title: 'pt-0 flex items-center justify-center text-gray-80 text-subtitle1',
  description: 'pb-[0px] text-gray-80 text-body1 text-center',
  footer: 'w-full flex gap-2 justify-center items-center pt-6',
};

function DialogContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx(variants.container, className)}>{children}</div>;
}

// 모달 오픈 시 배경 흐려지게 하는 컴포넌트
function BackDrop() {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-black/30"
        aria-hidden="true"
        data-testid="backdrop"
      />
    </Transition.Child>
  );
}

function DialogMain({
  open,
  onClose,
  ariaLabel,
  className,
  initialFocus,
  disableKeyboardEvent,
  children,
}: DialogProps) {
  return (
    <DialogProvider>
      <Transition show={open} as={Fragment}>
        <Dialog
          onClose={() => (disableKeyboardEvent ? {} : onClose())}
          initialFocus={initialFocus}
          className="relative z-50"
          id="ddoba-modal"
          aria-label={ariaLabel}
        >
          <BackDrop />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed top-0 bottom-0 left-0 right-0 p-6 flex items-center justify-center w-screen">
              <DialogContainer className={className}>
                {children}
              </DialogContainer>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </DialogProvider>
  );
}

export default DialogMain;
