import { API_METHOD_TYPE } from '@/types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getHeaders = (isFormData: boolean): HeadersInit => {
  if (isFormData) {
    return {
      Authorization: `Bearer ${sessionStorage.accessToken}`,
    };
  } else {
    return {
      Authorization: `Bearer ${sessionStorage.accessToken}`,
      'Content-Type': 'application/json',
    };
  }
};

export const apiRequest = async <T>(
  endpoint: string,
  method: API_METHOD_TYPE | undefined = 'GET',
  body?: BodyInit | object | null | undefined,
) => {
  const accessToken =
    typeof window !== 'undefined' && sessionStorage.getItem('accessToken');
  const refreshToken =
    typeof window !== 'undefined' && localStorage.getItem('refreshToken');

  const isFormData = body instanceof FormData;

  const options: RequestInit = {
    method,
    headers: accessToken
      ? getHeaders(isFormData)
      : { 'Content-Type': 'application/json' },
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };

  try {
    let response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (response.status === 401 && refreshToken) {
      const refreshResponse = await fetch(
        `${BASE_URL}/api/v1/members/refreshToken?refreshToken=${refreshToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.accessToken;

        sessionStorage.setItem('accessToken', newAccessToken);

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        response = await fetch(`${BASE_URL}${endpoint}`, options);
      } else {
        throw new Error('Failed to refresh access token');
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch data');
    }

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
