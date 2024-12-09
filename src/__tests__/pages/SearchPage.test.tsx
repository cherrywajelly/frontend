import { usePostSearchResult } from '@/hooks/api/useSearch';

import RecoilRootWrapper from '@/app/RecoilRootWrapper';
import SearchPage from '@/app/search/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useRouter } from 'next/navigation';

jest.mock('@/hooks/api/useSearch', () => ({
  usePostSearchResult: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('SearchPage 컴포넌트', () => {
  const mockMutate = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePostSearchResult as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('검색 입력 인풋바가 렌더링되어어 한다.', () => {
    render(
      <RecoilRootWrapper>
        <SearchPage />
      </RecoilRootWrapper>,
    );

    const input = screen.getByPlaceholderText(
      '검색할 사용자의 닉네임을 입력하세요.',
    );
    expect(input).toBeInTheDocument();
  });

  it('검색어 입력 시 mutate 호출이 이루어져야 한다.', async () => {
    render(
      <RecoilRootWrapper>
        <SearchPage />
      </RecoilRootWrapper>,
    );

    const input = screen.getByPlaceholderText(
      '검색할 사용자의 닉네임을 입력하세요.',
    );
    fireEvent.change(input, { target: { value: 'testUser' } });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          searchKeyword: 'testUser',
        }),
        expect.any(Object),
      );
    });
  });

  it('검색 결과들은 알맞게 렌더링되어야 한다.', async () => {
    const mockSearchResults = {
      searchResponses: [
        { memberId: 1, profileUrl: 'url1', nickname: 'user1' },
        { memberId: 2, profileUrl: 'url2', nickname: 'user2' },
      ],
    };

    (usePostSearchResult as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });

    mockMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess(mockSearchResults);
    });

    render(
      <RecoilRootWrapper>
        <SearchPage />
      </RecoilRootWrapper>,
    );

    const input = screen.getByPlaceholderText(
      '검색할 사용자의 닉네임을 입력하세요.',
    );
    fireEvent.change(input, { target: { value: 'user' } });

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });

  it('취소 버튼이 클릭되면 입력값이 초기화되어야 한다.', () => {
    render(
      <RecoilRootWrapper>
        <SearchPage />
      </RecoilRootWrapper>,
    );

    const inputElement = screen.getByPlaceholderText(
      '검색할 사용자의 닉네임을 입력하세요.',
    );

    fireEvent.change(inputElement, { target: { value: '테스트 입력값' } });
    fireEvent.focus(inputElement);

    const cancelButton = screen.getByText('취소');
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(inputElement).toHaveValue('');
  });

  it('사용자 검색 후 검색 결과(프로필) 클릭 시 프로필 페이지로 라우팅이 이루어져야 한다.', async () => {
    const mockSearchResults = {
      searchResponses: [{ memberId: 1, profileUrl: 'url1', nickname: 'user1' }],
    };

    (usePostSearchResult as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });

    mockMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess(mockSearchResults);
    });

    render(
      <RecoilRootWrapper>
        <SearchPage />
      </RecoilRootWrapper>,
    );

    const input = screen.getByPlaceholderText(
      '검색할 사용자의 닉네임을 입력하세요.',
    );
    fireEvent.change(input, { target: { value: 'user' } });

    await waitFor(() => {
      const userItem = screen.getByText('user1');
      fireEvent.click(userItem);
      expect(mockRouterPush).toHaveBeenCalledWith('/profile/1');
    });
  });
});
