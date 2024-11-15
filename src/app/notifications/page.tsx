'use client';

import { useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import TopBar from '@/components/common-components/top-bar';

import NotiDefaultItem from '@/components/notifications/NotiDefaultItem';
import NotiFollowItem from '@/components/notifications/NotiFollowItem';
import NotiPieceJamItem from '@/components/notifications/NotiPieceJamItem';

import {
  useGetMoveNotificationsPage,
  useGetNotificationsList,
} from '@/hooks/api/useFcm';

import clsx from 'clsx';

export default function NotificationsPage() {
  const { data, isLoading } = useGetNotificationsList();

  const [selectedFcmId, setSelectedFcmId] = useState<number | null>(null);

  const { data: moveData, refetch } = useGetMoveNotificationsPage(
    selectedFcmId ?? 0,
  );

  const handleNotificationClick = async (fcmId: number) => {
    setSelectedFcmId(fcmId);

    const response = await refetch();
    if (response.data) {
      console.log('moveData:', response.data);
    } else {
      console.error('Failed to fetch moveData');
    }
  };

  return (
    <div className="w-full h-screen">
      <TopBar title="알림" isBackBtn={false} />

      <div className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto bg-gray-05">
        {isLoading && <div>로딩 중...</div>}
        {data &&
          data.map((item) => {
            switch (item.fcmConstant) {
              case 'EVENTTOASTSPREAD':
              case 'GIFTTOASTBAKED':
                return (
                  <NotiPieceJamItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => handleNotificationClick(item.fcmId)}
                  />
                );
              case 'FOLLOW':
                return (
                  <NotiFollowItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => handleNotificationClick(item.fcmId)}
                  />
                );
              default:
                return (
                  <NotiDefaultItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => handleNotificationClick(item.fcmId)}
                  />
                );
            }
          })}
      </div>

      <BottomBar />
    </div>
  );
}
