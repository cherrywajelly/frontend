import { apiRequest } from '.';

// 닉네임 중복검증
export const postNicknameValid = async (nickname: string) => {
  await apiRequest(`/api/v1/members/exists?nickname=${nickname}`, 'POST', {
    nickname,
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
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
      if (res.status === 200) {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
