import { apiRequest } from '.';

// 닉네임 중복검증
export const postNicknameValid = async (nickname: string) => {
  await apiRequest(`/api/v1/members/exists?nickname=${nickname}`, 'POST', {
    nickname,
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
      console.log(err);
    });
};

// 닉네임 등록
export const postNicknameSignUp = async (nickname: string) => {
  await apiRequest(`/api/v1/members?nickname=${nickname}`, 'POST', {
    nickname,
  })
    .then((res) => {
      if (res.status === 500) {
        throw new Error('Internal Server Error');
      }

      if (res.status === 200) {
        alert('회원가입 완료');
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
