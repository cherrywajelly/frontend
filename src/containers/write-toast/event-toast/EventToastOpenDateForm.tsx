'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { LuCalendarDays } from 'react-icons/lu';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

export default function EventToastOpenDateForm() {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const handleSubmit = () => {};

  const handleDate = (date: Date | null) => {
    setDate(date as Date);
    setIsValid(true);
  };

  const handleDateInput = (e: any) => {
    const isDateInput = /^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(e.target.value);
    if (!isDateInput) e.preventDefault();
  };

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <div>
        <InputForm
          title="토스트를 오픈할 특별한 날을 선택해주세요."
          subTitle="오픈 날짜"
        >
          <DatePicker
            selected={date}
            placeholderText="YYYY-MM-DD"
            dateFormat="yyyy-MM-dd"
            onChange={handleDate}
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

      <Button color={isValid ? 'active' : 'disabled'} onClick={handleSubmit}>
        다음
      </Button>
    </div>
  );
}
