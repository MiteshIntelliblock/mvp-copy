import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const adminApiSlic = createApi({
  reducerPath: "adminApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    //
  }),
});
