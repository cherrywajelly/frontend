'use client';

import 'react-quill/dist/quill.snow.css';

import { useState } from 'react';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';
import TopBar from '@/components/common-components/top-bar';

import {
  formats,
  modules,
  QuillWrapper,
} from '@/containers/write-toast/WriteToastForm';

export default function SettingInquiryPage() {
  const [title, setTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const emailRegExp =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const handleSubmit = () => {
    // TODO: 문의 로직 진행
  };

  const isEmailValid = emailRegExp.test(email);
  const isAllFieldsFilled =
    title.length > 0 && email.length > 0 && contents.length > 0;

  return (
    <div className="w-full h-lvh">
      <TopBar title="1:1 문의" />

      <div className="p-6 box-border h-[calc(100vh-48px)] flex justify-between flex-grow flex-col bg-gray-05 overflow-y-auto">
        <div className="flex flex-col flex-1">
          <Input
            placeholder="제목을 입력해주세요. (20자 이내)"
            maxLength={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-[11px]"
          />

          <Input
            placeholder="답변 받을 이메일 주소를 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-[11px]"
          />

          <QuillWrapper
            modules={modules}
            formats={formats}
            value={contents}
            onChange={setContents}
            placeholder="문의 내용을 작성해주세요."
            theme="snow"
          />
        </div>

        <Button
          color={isEmailValid && isAllFieldsFilled ? 'active' : 'disabled'}
          onClick={handleSubmit}
          disabled={!(isEmailValid && isAllFieldsFilled)}
          className="mb-6"
        >
          문의하기
        </Button>
      </div>
    </div>
  );
}