import { InquiriesRequestBody, RequestGroupTeam } from '@/types/api/setting';

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

// 회원 탈퇴
export const deleteWithdrawal = async () => {
  await apiRequest(`/api/v1/withdrawal`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// 문의 작성 저장
export const postInquiries = async ({
  inquiryContents,
  inquiryRequest,
}: InquiriesRequestBody) => {
  const formData = new FormData();

  formData.append('inquiryContents', inquiryContents);

  const requestBlob = new Blob([JSON.stringify(inquiryRequest)], {
    type: 'application/json',
  });

  formData.append('inquiryRequest', requestBlob);

  await apiRequest(`/api/v1/inquiries`, 'POST', formData)
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};
