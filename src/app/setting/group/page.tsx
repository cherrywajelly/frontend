'use client';

import { useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import TopBar from '@/components/common-components/top-bar';

import AddGroupUser from '@/containers/setting/AddGroupUser';

import temp from '../../../../public/images/default-toast.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SettingGroup() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1); // move to previous step
    } else if (step === 0) {
      router.back();
    }
  };

  return (
    <div className="w-full h-lvh">
      <TopBar onBack={handleBack} title="그룹 만들기" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {step === 0 && <AddGroupUser />}
        {/* {step === 1 && <GiftToastNameForm />} */}
      </div>
    </div>
  );
}
