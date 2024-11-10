export interface MyProfileResponse {
  nickname: string;
  profileUrl: string;
  followingCount: number;
  followerCount: number;
  teamCount: number;
}

// 팔로잉 목록 조회
export interface FollowingItemResponse {
  memberId: number;
  nickname: string;
  memberProfileUrl: string | null;
}

export interface FollowingListResponse {
  followResponses: FollowingItemResponse[];
}

export interface GroupItemResponse {
  teamId: number;
  teamName: string;
  teamProfileUrl: string | null;
}

export interface GroupListResponse {
  teamResponses: GroupItemResponse[];
}
