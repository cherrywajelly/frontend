import { apiRequest } from '.';

// 아이콘 그룹 목록 조회
export const getIconGroups = async () => {
  const res = await apiRequest(`/api/v1/iconGroups`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 아이콘 그룹 목록 삭제
export const deleteIconGroups = async (iconGroupId: number) => {
  await apiRequest(`/api/v1/iconGroups/${iconGroupId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
