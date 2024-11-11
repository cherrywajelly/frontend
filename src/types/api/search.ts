export interface SearchRequestBody {
  page: number;
  size: number;
  searchKeyword: string;
}

export interface SearchItemResponse {
  memberId: number;
  nickname: string;
  profileUrl: string;
}

export interface SearchResultResponse {
  nextPage: number;
  size: number;
  searchResponses: SearchItemResponse[];
}