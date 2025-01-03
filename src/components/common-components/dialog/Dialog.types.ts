export type DialogProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
  ariaLabel?: string;
  disableKeyboardEvent?: boolean;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
};
