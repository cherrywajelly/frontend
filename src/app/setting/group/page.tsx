'use client';

import TopBar from '@/components/common-components/top-bar';

import GroupList from '@/containers/setting/GroupList';

export default function GroupListPage() {
  return (
    <div className="w-full h-lvh">
      <TopBar title="그룹 관리" />

      <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-05">
        {<GroupList />}
      </div>
    </div>
  );
}
