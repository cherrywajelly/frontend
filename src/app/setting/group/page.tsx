'use client';

import TopBar from '@/components/common-components/top-bar';

import GroupList from '@/containers/setting/GroupList';

import { useRouter } from 'next/navigation';

export default function GroupListPage() {
  const router = useRouter();
  return (
    <div className="w-full h-lvh">
      <TopBar title="그룹 관리" onBack={() => router.push('/mypage')} />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        {<GroupList />}
      </div>
    </div>
  );
}
