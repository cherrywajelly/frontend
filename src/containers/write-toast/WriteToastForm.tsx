import 'react-quill/dist/quill.snow.css';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

import Button from '@/components/common-components/button';
import Input from '@/components/common-components/input';

import { pieceData, ToastData } from '@/types/atoms/toastAtom';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { RecoilState, useRecoilState } from 'recoil';

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

export type WriteToastFormProps<T> = {
  stepState: RecoilState<number>;
  dataState: RecoilState<T>;
  handleSubmit?: () => void;
  type?: 'jam' | 'toast';
};

export default function WriteToastForm<T extends pieceData | ToastData>(
  props: WriteToastFormProps<T>,
) {
  const { dataState, type } = props;
  const maxFileCount = type === 'jam' ? 1 : 3;

  const [toastData, setToastData] = useRecoilState(dataState);

  const [title, setTitle] = useState<string>(toastData?.title || '');
  const [contents, setContents] = useState<string>(toastData?.contents || '');

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

    if (filePreviews.length + files.length > maxFileCount) {
      alert(`이미지는 최대 ${maxFileCount}개까지 첨부할 수 있습니다.`);
      return;
    }

    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          newPreviews.push(reader.result);
          newFiles.push(file);

          if (newPreviews.length === files.length) {
            setFilePreviews((prev) => [...prev, ...newPreviews]);
            setToastData((prev) => ({
              ...prev,
              imgList: [...(prev.imgList || []), ...newFiles],
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 사진 제거
  const handleCancelClick = (index: number) => {
    setFilePreviews((prev) => prev.filter((_, idx) => idx !== index));

    setToastData((prev) => ({
      ...prev,
      imgList: prev.imgList?.filter((_, idx) => idx !== index),
    }));
  };

  useEffect(() => {
    const plainText = contents.replace(/<[^>]*>/g, '').trim();
    const isSubmitAble = title.length > 0 && plainText.length > 0;

    setToastData((prev) => ({
      ...prev,
      title,
      contents,
      submitAble: isSubmitAble,
    }));
  }, [title, contents, setToastData]);

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
