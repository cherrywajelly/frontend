import { ChangeEvent, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import { useGroupTeam } from '@/hooks/api/useSetting';
import { UserDefaultProps } from '@/types/user';

import temp from '../../../public/images/default-toast.png';

import Image from 'next/image';

export const tempUserList: UserDefaultProps[] = [
  { profileImg: temp, nickname: '채민이', memberId: 1 },
  { profileImg: temp, nickname: 'chchch', memberId: 2 },
  { profileImg: temp, nickname: '정채연', memberId: 3 },
  { profileImg: temp, nickname: '에스파', memberId: 4 },
  { profileImg: temp, nickname: 'asdf', memberId: 5 },
  { profileImg: temp, nickname: 'cccx', memberId: 6 },
  { profileImg: temp, nickname: 'cswd', memberId: 7 },
  { profileImg: temp, nickname: 'xvew', memberId: 8 },
  { profileImg: temp, nickname: 'asdfaefg', memberId: 9 },
  { profileImg: temp, nickname: 'vdsefs', memberId: 10 },
];

export default function GenerateGroup({
  selectedUsers,
}: {
  selectedUsers: UserDefaultProps[];
}) {
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

  const { mutate, isPending } = useGroupTeam({
    teamName: groupName,
    teamMembers: selectedUsers.map((user) => user.memberId as number),
  });

  const handleSubmit = () => {
    //
    mutate();
  };

  return (
    <div className="w-full h-full p-6 flex flex-col bg-gray-05">
      <div className="flex flex-col items-center flex-none">
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
        <span className="w-full text-body1 text-black-main mt-5 mb-3">
          그룹원
        </span>
      </div>

      <div className="flex-grow mb-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {selectedUsers.map((item) => (
            <div className="flex gap-4 items-center" key={item.nickname}>
              <Image
                src={item.profileImg}
                alt=""
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
              <span className="text-body2 text-black-main">
                {item.nickname}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        size="md"
        color={profileImg && groupName ? 'active' : 'disabled'}
        onClick={handleSubmit}
        disabled={!profileImg || !groupName}
        className="flex-none mb-4"
      >
        그룹 생성
      </Button>
    </div>
  );
}