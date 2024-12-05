import { ChangeEvent, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import Spinner from '@/components/common-components/spinner';

import { useGroupTeam, usePostGroupImage } from '@/hooks/api/useSetting';
import { FollowingItemResponse } from '@/types/api/mypage';
import { UserDefaultProps } from '@/types/user';
import { notifySuccess } from '@/utils/toast';

import temp from '../../../public/images/default-toast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GenerateGroup({
  selectedUsers,
}: {
  selectedUsers: FollowingItemResponse[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<File | null>(null);

  // const [profileImg, setProfileImg] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setProfileImg(file);
    }
    // const file = event.target.files?.[0];

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.result) {
    //       setProfileImg(reader.result as string);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const router = useRouter();

  const { mutate, isPending, data, mutateAsync } = useGroupTeam({
    teamName: groupName,
    teamMembers: selectedUsers.map((user) => user.memberId as number),
  });

  const { mutate: mutateGroupImg, isPending: isPendingPostGroup } =
    usePostGroupImage();

  const handleSubmit = async () => {
    try {
      const responseData = await mutateAsync();

      if (responseData?.teamId && profileImg) {
        await mutateGroupImg(
          {
            teamId: responseData.teamId,
            teamImage: profileImg,
          },
          {
            onSuccess: () => {
              notifySuccess('그룹이 생성되었어요!');
              router.replace('/setting/group');
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full p-6 flex flex-col bg-gray-05">
      {isPendingPostGroup ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col items-center flex-none">
            <div className="relative" onClick={handleFileUploadClick}>
              <Image
                src={profileImg ? URL.createObjectURL(profileImg) : temp}
                alt=""
                width={120}
                height={120}
                className="object-cover rounded-full w-[120px] h-[120px]"
              />
              <div className="absolute bottom-[-12px] right-0 border-4 border-gray-05 bg-gray-10 w-[40px] h-[40px] rounded-full flex justify-center items-center">
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
                maxLength={20}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <span className="p-1 text-navigation1 text-gray-60">
                그룹명은 최대 20자까지 가능합니다.
              </span>
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
                    src={item.memberProfileUrl ?? ''}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="object-cover rounded-full w-[48px] h-[48px]"
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
        </>
      )}
    </div>
  );
}
