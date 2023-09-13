import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("auth-token");
const headers = {
  authorization: `bearer ${token}`,
};
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (payload) => ({
        url: "user/register",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "user/login",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    fetchUser: builder.mutation({
      query: () => ({
        url: "user/currentUser",
        method: "GET",
        headers: headers,
      }),
      providesTags: ["User"],
    }),
    userKYC: builder.mutation({
      query: (payload) => ({
        url: `user/kycforuser?${payload.query}=true`,
        method: "POST",
        body: payload.image,
        headers: headers,
      }),
      invalidatesTags: ["User"],
    }),
    companyKYC: builder.mutation({
      query: (payload) => ({
        url: `user/kycforcompany?${payload.query}=true`,
        method: "POST",
        body: payload.image,
        headers: headers,
      }),
      invalidatesTags: ["User"],
    }),
    uploadBankDetails: builder.mutation({
      query: (payload) => ({
        url: "user/addbankdetails",
        method: "POST",
        body: payload,
        headers: headers,
      }),
      invalidatesTags: ["User"],
    }),
    userDetails: builder.mutation({
      query: (payload) => ({
        url: "user/detail",
        method: "POST",
        body: payload,
        headers: headers,
      }),
      invalidatesTags: ["User"],
    }),

    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "user/forgetpassword",
        method: "POST",
        body: payload,
      }),
    }),
    googleAuth: builder.mutation({
      query: (payload) => ({
        url: "user/googleSignUp",
        method: "POST",
        body: payload,
      }),
    }),
    // for google auth users
    sendUserType: builder.mutation({
      query: (payload) => ({
        url: "user/typeupdate",
        method: "POST",
        body: payload,
        headers: headers,
      }),
    }),
    requestCode: builder.mutation({
      query: () => ({
        url: "user/randomkey",
        method: "POST",
      }),
    }),
    virtualAuth: builder.mutation({
      query: (payload) => ({
        url: "user/virtualauth",
        method: "POST",
        body: payload.video,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchUserMutation,
  useUserKYCMutation,
  useCompanyKYCMutation,
  useUploadBankDetailsMutation,
  useUserDetailsMutation,
  useForgetPasswordMutation,
  useGoogleAuthMutation,
  useSendUserTypeMutation,
  useVirtualAuthMutation,
  useRequestCodeMutation,
} = apiSlice;
