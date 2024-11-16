import { variants } from './Dialog';

import clsx from 'clsx';

// 모달 내부 Footer 컴포넌트 (모달하단: 확인/취소 버튼 등)
export default function DialogFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx(variants.footer, className)}>{children}</div>;
}
