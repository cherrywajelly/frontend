export type TopBarProps = {
  title?: string;
  isBackBtn?: boolean;
  isRight?: boolean | RightType;
  submitAble?: boolean;
};

export const rightTypes = {
  submit: 'submit',
  setting: 'setting',
} as const;
export type RightType = (typeof rightTypes)[keyof typeof rightTypes];
