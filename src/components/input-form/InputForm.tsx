export type InputFormProps = {
  title: React.ReactNode;
  subTitle?: string;
  children?: React.ReactNode;
};

/**
 * InputForm 컴포넌트
 * @param {InputFormProps} props - InputForm에 전달되는 props
 * @returns {JSX.Element} - InputForm 컴포넌트 JSX 반환
 */
export default function InputForm(props: InputFormProps) {
  const { title, subTitle, children } = props;

  return (
    <>
      <h1 className="text-subtitle3 text-black-main tracking-[-0.36px] pb-6">
        {title}
      </h1>
      <div className="flex flex-col gap-1">
        <p className="pl-1 text-gray-60 text-navigation1">{subTitle}</p>
        {children}
      </div>
    </>
  );
}
