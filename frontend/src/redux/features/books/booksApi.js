import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: baseQuery,
  tagTypes: ['Books'],
  endpoints: (builder) => {
    return ({
        fetchAllBooks: builder.query({
            query: () => "/all-books",
            providesTags: ["Books"],
        }),

    })
  }
});

export const {useFetchAllBooksQuery}  = booksApi;
export default booksApi;
