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
        fetchBookById: builder.query({
          query: ({id}) => `/${id}`,
          providesTags: (result , error, id) => [{type: "Books", id}]
        }),
        addBook: builder.mutation({
          query: (newBook) => ({
            url: '/create-book',
            method: 'POST',
            body: newBook,
          }),
          invalidatesTags: ["Books"],
        }),
        updateBook: builder.mutation({
          query: ({id , ...rest}) => ({
            url: `/update-book/${id}`,
            method: 'PUT',
            body: rest,
            headers: {
              'Content-Type': 'application/json',
            },
          }),
          invalidatesTags: ['Books'],
        }),
        deleteBook: builder.mutation({
          query: (id) => ({
            url: `/delete-book/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['Books'],
        }),
    })
  },
});

export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useDeleteBookMutation}  = booksApi;
export default booksApi;
