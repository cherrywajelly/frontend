import temp from '../../../public/images/lcm.jpeg';

import Image from 'next/image';

export default function NotiPieceJamItem() {
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
        <span className="text-gray-80 text-body1">곰돌이</span>
        <span className="text-gray-80 text-body4">
          내 토스트에 잼을 발랐습니다
        </span>
        <span className="flex gap-[6px] items-center text-gray-60 text-body4">
          <span>마루는강쥐</span>
          <span>·</span>
          <span>25분 전</span>
        </span>
      </div>
    </div>
  );
}
