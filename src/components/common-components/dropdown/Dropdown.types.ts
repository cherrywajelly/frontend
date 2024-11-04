export const dropdownSizes = {
  sm: 'sm',
  md: 'md',
} as const;
export type DropdownSize = (typeof dropdownSizes)[keyof typeof dropdownSizes];

export const dropdownPositions = {
  left: 'left',
  center: 'center',
} as const;
export type DropdownPosition =
  (typeof dropdownPositions)[keyof typeof dropdownPositions];

export interface DropdownItem {
  label: string;
  onClick: () => void;
}

export type DropdownProps = {
  items: DropdownItem[];
  size?: DropdownSize;
  position?: DropdownPosition;
  color?: string;
};
