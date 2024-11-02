import { ChangeEvent, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import temp from '../../../public/images/default-toast.png';

import Image from 'next/image';

const tempData = [
  { img: temp, nickname: '채민이' },
  { img: temp, nickname: 'chchch' },
  { img: temp, nickname: '정채연' },
  { img: temp, nickname: '에스파' },
  { img: temp, nickname: 'asdf' },
  { img: temp, nickname: 'cccx' },
  { img: temp, nickname: 'cswd' },
  { img: temp, nickname: 'xvew' },
  { img: temp, nickname: 'asdfaefg' },
  { img: temp, nickname: 'vdsefs' },
];

export default function AddGroupUser() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImg, setProfileImg] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full p-6 flex flex-col gap-6 justify-between bg-gray-05">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={profileImg || temp}
            alt=""
            width={120}
            height={120}
            className="object-cover rounded-full w-[120px] h-[120px]"
          />
          <div
            onClick={handleFileUploadClick}
            className="absolute bottom-[-12px] right-0 border-4 border-gray-05 bg-gray-10 w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            <FiCamera size={20} />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="w-full mt-1">
          <span className="text-body1 text-black-main">그룹명</span>
          <Input
            placeholder="그룹명을 입력하세요."
            size="md"
            className="mt-4"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="w-full mt-5">
          <span className="text-body1 text-black-main">그룹원</span>
          <div className="flex flex-col gap-4 mt-3 max-h-[370px] overflow-y-auto">
            {tempData.map((item) => {
              return (
                <div className="flex gap-4 items-center" key={item.nickname}>
                  <Image
                    src={item.img}
                    alt=""
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                  <span className="text-body2 text-black-main">
                    {item.nickname}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Button
        size="md"
        className="w-full"
        color={profileImg && groupName ? 'active' : 'disabled'}
        // onClick={handleSubmit}
        disabled={!profileImg || !groupName}
      >
        그룹 생성
      </Button>
    </div>
  );
}
