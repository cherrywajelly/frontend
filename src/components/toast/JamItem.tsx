import clsx from 'clsx';
import Image from 'next/image';

export type JamItemProps = {
  iconImageUrl: string;
  nickname: string;
  onClick?: () => void;
  className?: string;
};

export default function JamItem(props: JamItemProps) {
  const { nickname, iconImageUrl, onClick, className } = props;

  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex flex-col justify-center items-center gap-1 p-2 box-border border border-gray-10 bg-white rounded-[10px]',
        className,
      )}
    >
      <Image
        src={iconImageUrl ?? ''}
        width={80}
        height={80}
        alt=""
        unoptimized
        className="w-[80px] h-[80px] object-cover"
      />
      <span className="text-gray-80 text-body4 line-clamp-1">@{nickname}</span>
    </div>
  );
}
