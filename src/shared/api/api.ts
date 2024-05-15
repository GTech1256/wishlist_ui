import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://wishlist.sytes.net/api'

export type CreateWish = {
  title: string;
  description?: string;
  price?: number;
  image?: string;
  isPublic?: boolean;
}

export type Wish = {
    id: string;
    title: string;
    description: string | null;
    price: number | null;
    image: string | null;
    isPublic: boolean;
}
export type List = Array<Wish>

export type UserStats = {
  wishComplete: number,
  wishPublic: number,
  wishTotal: number
}

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

    getUserStatsData: builder.query<UserStats, void>({
      query: () => `/user/stats`,
    }),

    addWish: builder.mutation<Wish, CreateWish>({
      query: (body) => ({
        url: `wish`,
        method: 'POST',
        body,
      }),
    }),

    editWish: builder.mutation<Wish, Wish>({
      query: ({ id, ...wish }) => ({
        url: `wish/${id}`,
        method: 'PATCH',
        body: wish,
      }),
    }),

    deleteWish: builder.mutation<Wish['id'], Wish>({
      query: (id) => ({
        url: `wish/${id}`,
        method: 'DELETE',
      }),
    }),

    getPersonalWishes: builder.query<List, { limit?: number } | void>({
      query: ({ limit } = {}) => `/wish/user?limit=${limit}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPersonalWishesQuery, useGetAuthDataQuery, useLazyGetAuthDataQuery, useAddWishMutation, useEditWishMutation, useGetUserStatsDataQuery } = api


