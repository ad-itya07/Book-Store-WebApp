import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/orders`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const ordersApi = createApi({
  reducerPath: "OrdersApi",
  baseQuery: baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => {
    return {
      createOrder: builder.mutation({
        query: (newOrder) => ({
          url: "/place-order",
          method: "POST",
          body: newOrder,
          credentials: "include",
        }),
      }),
      getOrdersOfUserByEmail: builder.query({
        query: ({ email }) => ({
          url: `/order-details/user/${email}`,
          method: "GET",
        }),
        providesTags: ["Orders"],
      }),
      getOrderOfUserByEmailAndOrderId: builder.query({
        query: ({ email, orderId }) => ({
          url: `/order-details/user/${email}/${orderId}`,
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useGetOrdersOfUserByEmailQuery,
  useGetOrderOfUserByEmailAndOrderIdQuery,
} = ordersApi;

export default ordersApi;
