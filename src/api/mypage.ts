import { apiRequest } from '.';

// 마이페이지 - 상단 프로필 정보 조회
export const getMyProfile = async () => {
  const res = await apiRequest(`/api/v1/members`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 팔로워 목록 조회
export const getFollowers = async () => {
  const res = await apiRequest(`/api/v1/follows/followers`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 팔로잉 목록 조회
export const getFollowings = async () => {
  const res = await apiRequest(`/api/v1/follows/followings`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 그룹 목록 조회
export const getGroup = async () => {
  const res = await apiRequest(`/api/v1/teams`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// 팔로잉 등록
export const postFollowingUser = async (followingId: number) => {
  await apiRequest(`/api/v1/follows/followings/${followingId}`, 'POST')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        // console.log('팔로우됨');
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// 팔로잉 취소
export const deleteFollowingUser = async (followingMemberId: number) => {
  await apiRequest(`/api/v1/follows/followings/${followingMemberId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        // console.log('팔로잉 취소됨');
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// 팔로워 취소
export const deleteFollowerUser = async (followerMemberId: number) => {
  await apiRequest(`/api/v1/follows/followers/${followerMemberId}`, 'DELETE')
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        // console.log('팔로워 취소됨');
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
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
        // console.log('그룹 삭제됨');
        return res;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// 마이페이지 - 진열장 조회
export const getMyShowcase = async () => {
  const res = await apiRequest(`/api/v1/showcases/members`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.showcaseResponses;
};

//  진열장 목록 조회
export const getMyShowcaseList = async () => {
  const res = await apiRequest(`/api/v1/showcases`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.showcaseEditResponses;
};

// 진열장 등록
export const postMyShowcaseList = async (showcases: number[]) => {
  await apiRequest(`/api/v1/showcases`, 'POST', {
    showcases,
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
      // console.log(err);
      throw err;
    });
};

// 진열장 삭제
export const deleteShowcaseItem = async (showcaseId: number) => {
  await apiRequest(`/api/v1/showcases/${showcaseId}`, 'DELETE')
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
