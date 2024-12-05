'use client';

import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { LuCalendarDays } from 'react-icons/lu';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import InputForm from '@/components/input-form/InputForm';

import { eventToastDataState, eventToastStepState } from '@/atoms/toastAtom';

import { useRecoilState, useSetRecoilState } from 'recoil';

export default function EventToastOpenDateForm() {
  const setStep = useSetRecoilState(eventToastStepState);
  const [eventData, setEventData] = useRecoilState(eventToastDataState);

  const handleSubmit = () => {
    setStep((prev) => prev + 1);
  };

  const handleDate = (date: Date | null) => {
    setEventData((prev) => ({ ...prev, openDate: date }));
  };

  const handleDateInput = (e: any) => {
    const isDateInput = /^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(e.target.value);
    if (!isDateInput) e.preventDefault();
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div className="w-full h-full px-6 py-6 flex flex-col justify-between">
      <div>
        <InputForm
          title="토스트를 오픈할 특별한 날을 선택해주세요."
          subTitle="오픈 날짜"
        >
          <DatePicker
            selected={eventData.openDate}
            placeholderText="YYYY-MM-DD"
            dateFormat="yyyy-MM-dd"
            onChange={handleDate}
            minDate={tomorrow}
            onChangeRaw={handleDateInput}
            customInput={<Input readOnly startIcon={<LuCalendarDays />} />}
          />
          <span className="pt-2 px-2 text-body5 text-gray-80">
            날짜를 선택하게 되면, 그 전까지는 토스트를 열어보지 못해요.
            <br />
            {/* 만약 바로 열고 싶다면 오늘을 선택해주세요. */}
          </span>
        </InputForm>
      </div>

      <Button
        color={eventData.openDate ? 'active' : 'disabled'}
        onClick={handleSubmit}
        disabled={!eventData.openDate}
        className="mb-6"
      >
        다음
      </Button>
    </div>
  );
}
