import { RequestGroupTeam } from '@/types/api/setting';

import { apiRequest } from '.';

// 그룹 이미지 등록
export const postGroupTeamImage = async (teamId: number, teamImage: File) => {
  const formData = new FormData();
  formData.append('teamProfileImage', teamImage);

  await apiRequest(`/api/v1/teams/${teamId}/image`, 'POST', formData)
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res.json();
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// 그룹 등록
export const postGroupTeam = async ({
  teamName,
  teamMembers,
}: RequestGroupTeam) => {
  try {
    const res = await apiRequest(`/api/v1/teams`, 'POST', {
      teamName,
      teamMembers,
    });

    if (res.status === 500) {
      throw new Error('Internal Server Error');
    }

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error(`Unexpected status code: ${res.status}`);
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

// 프로필 이미지 등록
export const postProfileImage = async (profileImage: File) => {
  const formData = new FormData();
  formData.append('profileImage', profileImage);

  await apiRequest(`/api/v1/members/profile-image`, 'POST', formData)
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res.json();
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};
