import Button from '../common-components/button';

import { useRouter } from 'next/navigation';

export type TargetDividerProps = {
  isButton?: boolean;
  text: string;
};

export default function TargetDivider(props: TargetDividerProps) {
  const { isButton = false, text } = props;

  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-80 text-navigation1">{text}</span>
      <span className="w-full flex flex-1 border-t border-gray-20" />
      {isButton && (
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            router.push('/setting/group');
          }}
        >
          그룹 만들기
        </Button>
      )}
    </div>
  );
}
