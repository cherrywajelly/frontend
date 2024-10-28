export type InputProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: InputSize;
  search?: boolean;
  className?: string;
  defaultValue?: string | number | Date;
  startIcon?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'>;

export const inputSizes = {
  sm: 'sm',
  md: 'md',
} as const;
export type InputSize = (typeof inputSizes)[keyof typeof inputSizes];
