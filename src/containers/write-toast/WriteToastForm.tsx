import 'react-quill/dist/quill.snow.css';

import { ChangeEvent, useRef, useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import { TostFormProps } from './ToastDecoForm';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';

const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    // ['link', 'video'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  // 'image',
  // 'video',
];

export default function WriteToastForm(props: TostFormProps) {
  const { dataState } = props;

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const [toastData, setToastData] = useRecoilState(dataState);

  const handleWriteTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // preview image
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // 10개 이상의 파일은 추가하지 않도록 제한
    if (filePreviews.length + files.length > 10) {
      alert('이미지는 최대 10개까지 첨부할 수 있습니다.');
      return;
    }

    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setFilePreviews((prev) => [...prev, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 사진 제거
  const handleCancelClick = (index: number) => {
    setFilePreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="h-full">
      <div className="w-full h-full py-5 px-6 flex flex-col">
        <Input
          placeholder="제목을 작성해주세요."
          value={title}
          onChange={handleWriteTitle}
          className="mb-[11px]"
        />
        <QuillWrapper
          modules={modules}
          formats={formats}
          value={contents}
          onChange={setContents}
          placeholder="토스트에 구울 메시지를 작성해주세요."
          theme="snow"
        />

        <div className="mt-11 pt-6 flex items-center justify-start">
          <Button
            onClick={handleFileUploadClick}
            size="sm"
            color="primary"
            className="text-center flex items-center gap-2"
          >
            <IoCameraOutline />
            <span>사진 추가하기</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Image Preview */}
        <div className="flex py-3 overflow-x-auto whitespace-nowrap hide-scrollbar">
          {filePreviews.map((preview, idx) => (
            <div
              key={idx}
              className={`relative ${idx !== filePreviews.length - 1 ? 'mr-[6px]' : ''}`}
            >
              <Image
                src={preview}
                alt={`preview ${idx + 1}`}
                width={162}
                height={120}
                className="min-w-[120px] h-[120px] object-cover rounded-[8px] border border-gray-10"
              />
              <MdCancel
                className="absolute top-2 right-2 cursor-pointer text-gray-80"
                onClick={() => handleCancelClick(idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
