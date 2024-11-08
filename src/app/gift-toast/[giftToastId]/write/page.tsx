import TopBar from '@/components/common-components/top-bar';

import { jamStepState, jamDataState } from '@/atoms/toastAtom';
import WriteToastForm from '@/containers/write-toast/WriteToastForm';

export default function GiftWritePage() {
  return (
    <div className="w-full h-lvh">
      <TopBar title="토스트 조각 쌓기" />

      <div className="h-[calc(100vh-48px)] flex flex-col gap-1 bg-gray-05">
        {/* <WriteToastForm /> */}
      </div>
    </div>
  );
}
