import { variants } from './Dialog';

import clsx from 'clsx';

// 모달 Description 컴포넌트(모달의 설명) - 모달 기본 body 영역
export default function DialogDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(variants.description, className)}>{children}</div>
  );
}
