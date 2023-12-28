import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-assignment-api.abz.agency/api/v1",
  }),
  tagTypes: ["users", "token"],

  endpoints: (builder) => ({
    getToken: builder.query({ query: () => "/token" }),
    getUsers: builder.query({
      query: (page) => `/users?count=6&page=${page}`,
    }),
    addNewUser: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("photo", user.file);
        formData.append("position_id", user.position);

        return {
          url: "/users",
          method: "POST",
          body: formData,
          formData: true,
          headers: {
            Token: config.token,
          },
        };
      },
    }),
    getPositions: builder.query({ query: () => "/positions" }),
    getUserById: builder.query({ query: (id) => `/users/${id}` }),
  }),
});

export const {
  useGetTokenQuery,
  useGetPositionsQuery,
  useGetUserByIdQuery,
  useAddNewUserMutation,
  useGetUsersQuery,
} = api;
