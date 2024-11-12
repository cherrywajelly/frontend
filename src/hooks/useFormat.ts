import { useMemo } from 'react';

export default function useFormatDate(date: Date | null) {
  const formattedDate = useMemo(() => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [date]);

  return formattedDate;
}
