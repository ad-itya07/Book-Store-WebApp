import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/user/admin`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQuery,
  tagTypes: ["Admin"],
  endpoints: (builder) => {
    return {
      adminLogin: builder.mutation({
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
      }),
      getStats: builder.query({
        query: () => ({
          url: "/stats",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useAdminLoginMutation, useGetStatsQuery } = adminApi;

export default adminApi;
