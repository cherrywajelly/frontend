import { apiRequest } from '.';

// 닉네임 중복검증
export const getNicknameValid = async (nickname: string) => {
  await apiRequest(`/api/v1/members/nickname-validation?nickname=${nickname}`)
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 409) {
        return res.json();
      }

      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 닉네임 등록
export const putNicknameSignUp = async (nickname: string) => {
  await apiRequest(`/api/v1/members?nickname=${nickname}`, 'PUT', {
    nickname,
  })
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
