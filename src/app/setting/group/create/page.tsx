'use client';

import { useState } from 'react';

import TopBar from '@/components/common-components/top-bar';

import { FollowingItemResponse } from '@/types/api/mypage';

import AddGroupUser from '@/containers/setting/AddGroupUser';
import GenerateGroup from '@/containers/setting/GenerateGroup';

import { useRouter } from 'next/navigation';

export default function SettingGroup() {
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<FollowingItemResponse[]>(
    [],
  );

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else if (step === 0) {
      router.back();
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="그룹 만들기" />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        {step === 0 && (
          <AddGroupUser
            setStep={setStep}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
        {step === 1 && <GenerateGroup selectedUsers={selectedUsers} />}
      </div>
    </div>
  );
}
