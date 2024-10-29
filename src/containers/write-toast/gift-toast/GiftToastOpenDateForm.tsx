'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { LuCalendarDays } from 'react-icons/lu';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { RiCheckboxCircleFill } from 'react-icons/ri';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

export default function GiftToastOpenDateForm() {
  const [memoryDate, setMemoryDate] = useState<Date>();
  const [openDate, setOpenDate] = useState<Date>();
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleSubmit = () => {
    //
  };

  const handleOpenDate = (date: Date | null) => {
    setOpenDate(date as Date);
  };

  const handleMemoryDate = (date: Date | null) => {
    setMemoryDate(date as Date);
  };

  const handleDateInput = (e: any) => {
    const isDateInput = /^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(e.target.value);
    if (!isDateInput) e.preventDefault();
  };

  const toggleAgree = () => setIsAgree((prev) => !prev);

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <div>
        <InputForm
          title="토스트에 기록하고 싶은 날을 선택해주세요."
          subTitle="기억 날짜"
        >
          <DatePicker
            selected={memoryDate}
            placeholderText="YYYY-MM-DD"
            dateFormat="yyyy-MM-dd"
            onChange={handleMemoryDate}
            onChangeRaw={handleDateInput}
            maxDate={new Date()}
            customInput={<Input readOnly startIcon={<LuCalendarDays />} />}
          />
        </InputForm>
      </div>

      <div>
        <InputForm
          title="토스트를 오픈할 특별한 날을 선택해주세요."
          subTitle="오픈 날짜"
        >
          <DatePicker
            selected={openDate}
            placeholderText="YYYY-MM-DD"
            dateFormat="yyyy-MM-dd"
            onChange={handleOpenDate}
            minDate={new Date()}
            onChangeRaw={handleDateInput}
            customInput={<Input readOnly startIcon={<LuCalendarDays />} />}
          />
          <span className="pt-2 px-2 text-body5 text-gray-80">
            날짜를 선택하게 되면, 그 전까지는 토스트를 열어보지 못해요.
            <br />
            만약 바로 열고 싶다면 오늘을 선택해주세요.
          </span>
        </InputForm>
      </div>
      <div className="flex flex-col w-full">
        <span className="flex gap-2 justify-center items-center pb-[30px] text-body5 text-gray-80 text-center">
          <button onClick={toggleAgree} className="flex items-center space-x-2">
            {isAgree ? (
              <RiCheckboxCircleFill className="text-primary-main" size={20} />
            ) : (
              <RiCheckboxCircleLine className="text-gray-40" size={20} />
            )}
          </button>
          그룹원 모두가 작성해야 볼 수 있어요. 확인하셨나요?
        </span>

        <Button
          color={memoryDate && openDate && isAgree ? 'active' : 'disabled'}
          onClick={handleSubmit}
          size="md"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
