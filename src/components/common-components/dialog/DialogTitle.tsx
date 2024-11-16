import { variants } from './Dialog';

import clsx from 'clsx';

// 모달 Title 컴포넌트(모달의 상단 타이틀)
export default function DialogTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx(variants.title, className)}>{children}</div>;
}
