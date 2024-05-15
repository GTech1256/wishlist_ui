import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://wishlist.sytes.net/api'

export type Item = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;

}
type List = Array<Item>

export const getTokenFromLocalStorage = () => {
  return sessionStorage.getItem('userID');
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    headers: {
      'Authorization': getTokenFromLocalStorage() || 'null',
      'init-data': Telegram.WebApp.initData,
  },
  }),
  endpoints: (builder) => ({
    getAuthData: builder.query<List, void>({
      query: () => `/user/auth/data`,
    }),

    getList: builder.query<List, { limit?: number }>({
      query: ({ limit }) => `/list?limit=${limit}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListQuery, useGetAuthDataQuery, useLazyGetAuthDataQuery } = api


