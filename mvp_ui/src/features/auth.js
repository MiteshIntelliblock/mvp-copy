import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    googleAuth(state, actions) {
      const payload = actions.payload;
      console.log(payload);
      localStorage.setItem("auth-token", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        token: payload.accessToken,
        isAuthenticated: true,
      };
    },
    register(state, actions) {
      const payload = actions.payload;
      localStorage.setItem("auth-token", payload.accessToken);
      return {
        ...state,
        user: payload.registerUser,
        token: payload.accessToken,
        isAuthenticated: true,
      };
    },
    login(state, actions) {
      const payload = actions.payload;
      localStorage.setItem("auth-token", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        token: payload.accessToken,
        isAuthenticated: true,
      };
    },
    loadUser(state, actions) {
      const payload = actions.payload;
      console.log(payload);
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
      };
    },
    logout() {
      localStorage.removeItem("auth-token");
      return initialState;
    },
  },
});

export const { googleAuth, register, login, loadUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
