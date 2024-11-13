export type TopBarProps = {
  title?: string;
  isBackBtn?: boolean;
  isRight?: boolean | RightType;
  submitAble?: boolean;
  handleSubmit?: () => void;
};

export const rightTypes = {
  submit: 'submit',
  setting: 'setting',
} as const;
export type RightType = (typeof rightTypes)[keyof typeof rightTypes];
