export type InputFormProps = {
  title: React.ReactNode;
  subTitle?: string;
  children?: React.ReactNode;
};

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
