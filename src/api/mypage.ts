import { apiRequest } from '.';

// 마이페이지 - 상단 프로필 정보 조회
export const getMyProfile = async () => {
  const res = await apiRequest(`/api/v1/members`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 팔로워 목록 조회
export const getFollowers = async () => {
  const res = await apiRequest(`/api/v1/follows/followers`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 팔로잉 목록 조회
export const getFollowings = async () => {
  const res = await apiRequest(`/api/v1/follows/followings`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 그룹 목록 조회
export const getGroup = async () => {
  const res = await apiRequest(`/api/v1/teams`);

  if (!res.ok) {
    throw new Error(`HTTP error in Google! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 팔로잉 등록
export const postFollowingUser = async (followingId: number) => {
  await apiRequest(`/api/v1/follows/following/${followingId}`, 'POST')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        console.log('팔로우됨');
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 팔로잉 취소
export const deleteFollowingUser = async (followingMemberId: number) => {
  await apiRequest(`/api/v1/follows/following/${followingMemberId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        console.log('팔로잉 취소됨');
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 팔로워 취소
export const deleteFollowerUser = async (followerMemberId: number) => {
  await apiRequest(`/api/v1/follows/follower/${followerMemberId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        console.log('팔로워 취소됨');
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 그룹 삭제
export const deleteGroup = async (teamId: number) => {
  await apiRequest(`/api/v1/teams/${teamId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        console.log('그룹 삭제됨');
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
