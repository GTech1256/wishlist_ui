import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

const BASE_URL = 'http://localhost:3000'

type Item = {
    id: string;
    name: string;
    description: string;
    price: number;

}
type List = Array<Item>

export const getTokenFromLocalStorage = () => {
  return sessionStorage.getItem('userID');
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      'Authorization': getTokenFromLocalStorage() || 'null',
  },
  }),
  endpoints: (builder) => ({
    getList: builder.query<List, void>({
      query: () => `/list`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListQuery } = api


