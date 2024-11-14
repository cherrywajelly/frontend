'use client';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import NotiDefaultItem from '@/components/notifications/NotiDefaultItem';
import NotiFollowItem from '@/components/notifications/NotiFollowItem';
import NotiPieceJamItem from '@/components/notifications/NotiPieceJamItem';

import { useGetNotificationsList } from '@/hooks/api/useFcm';

export default function NotificationsPage() {
  const { data, isLoading } = useGetNotificationsList();
  console.log(data);

  return (
    <div className="w-full h-screen">
      <TopBar title="알림" isBackBtn={false} />

      <div className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto bg-gray-05">
        <NotiPieceJamItem />
        <NotiFollowItem />
        <NotiDefaultItem />
      </div>

      <BottomBar />
    </div>
  );
}
