import temp from '../../../public/images/lcm.jpeg';

import Image from 'next/image';

export default function NotiDefaultItem() {
  return (
    <div className="w-full border-b border-gray-10 py-5 px-6 flex items-center gap-4">
      <Image
        src={temp}
        width={64}
        height={64}
        alt=""
        className="w-[64px] h-[64px] object-cover rounded-[10px]"
      />

      <div className="flex flex-1 flex-col">
        <span className="text-black-main text-body2">
          그룹 토스트가 열렸습니다. 확인해 볼까요?
        </span>

        <span className="mt-1 flex gap-[6px] items-center text-gray-60 text-body4">
          <span>그룹토스트이름</span>
          <span>·</span>
          <span>25분 전</span>
        </span>
      </div>
    </div>
  );
}
