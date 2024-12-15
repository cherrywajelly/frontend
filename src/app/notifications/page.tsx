'use client';

import { useEffect, useState } from 'react';

import BottomBar from '@/components/common-components/bottom-bar';
import Spinner from '@/components/common-components/spinner';
import TopBar from '@/components/common-components/top-bar';

import NotiDefaultItem from '@/components/notifications/NotiDefaultItem';
import NotiFollowItem from '@/components/notifications/NotiFollowItem';
import NotiPieceJamItem from '@/components/notifications/NotiPieceJamItem';

import {
  useGetMoveNotificationsPage,
  useGetNotificationsList,
} from '@/hooks/api/useFcm';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const { data, isLoading, refetch: refetchList } = useGetNotificationsList();
  const router = useRouter();
  const [selectedFcmId, setSelectedFcmId] = useState<number | null>(null);

  const { data: moveData, refetch } = useGetMoveNotificationsPage(
    selectedFcmId ?? 0,
  );

  const handleNotificationClick = async (fcmId: number) => {
    setSelectedFcmId(fcmId);

    const response = await refetch();
    if (response.data) {
      refetchList();
    } else {
      console.error('Failed to fetch moveData');
    }
  };

  useEffect(() => {
    if (selectedFcmId !== null && selectedFcmId !== 0) {
      refetch();
    }
  }, [selectedFcmId, refetch]);

  return (
    <div className="w-full h-lvh bg-gray-05">
      <TopBar title="알림" isBackBtn={false} />

      <div
        data-testid="noti-list"
        className="w-full h-[calc(100vh-144px)] flex flex-grow flex-col overflow-y-auto bg-gray-05"
      >
        {isLoading && <Spinner />}
        {data &&
          data.map((item) => {
            switch (item.fcmConstant) {
              case 'EVENTTOASTSPREAD':
                return (
                  <NotiPieceJamItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => {
                      handleNotificationClick(item.fcmId);
                      router.push(`/event-toast/${item.param}`);
                    }}
                  />
                );
              case 'GIFTTOASTBAKED':
                return (
                  <NotiPieceJamItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => {
                      handleNotificationClick(item.fcmId);
                      router.push(`/gift-toast/${item.param}`);
                    }}
                  />
                );
              case 'FOLLOW':
                return (
                  <NotiFollowItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => {
                      handleNotificationClick(item.fcmId);
                      router.push(`/profile/${item.param}`);
                    }}
                  />
                );
              case 'EVENTTOASTOPENED':
                return (
                  <NotiDefaultItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => {
                      handleNotificationClick(item.fcmId);
                      router.push(`/event-toast/${item.param}`);
                    }}
                  />
                );
              default:
                return (
                  <NotiDefaultItem
                    key={item.fcmId}
                    item={item}
                    className={clsx(!item.isOpened ? '!bg-[#E3D1B7]' : '')}
                    onClick={() => {
                      handleNotificationClick(item.fcmId);
                      router.push(`/gift-toast/${item.param}`);
                    }}
                  />
                );
            }
          })}
      </div>

      <BottomBar />
    </div>
  );
}
