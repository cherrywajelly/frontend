import { RequestGroupTeam } from '@/types/api/setting';

import { apiRequest } from '.';

// 그룹 이미지 등록
export const postGroupTeamImage = async (teamId: number) => {
  await apiRequest(`/api/v1/teams/${teamId}/image`, 'POST')
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

// 그룹 등록
export const postGroupTeam = async ({
  teamName,
  teamMembers,
}: RequestGroupTeam) => {
  await apiRequest(`/api/v1/teams`, 'POST', {
    teamName,
    teamMembers,
  })
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      console.log(err.message);
      alert(err.message);
    });
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
      console.log(err);
    });
};
