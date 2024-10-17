export type TopBarProps = {
  title?: string;
  isBackBtn?: boolean;
  isRight?: RightType;
  submitAble?: boolean;
};

export const rightTypes = {
  submit: 'submit',
  hamburger: 'hamburger',
} as const;
export type RightType = (typeof rightTypes)[keyof typeof rightTypes];
