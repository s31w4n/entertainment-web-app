import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoginMode: boolean;
  userId: string | null;
  token: string | null;
  tokenExpirationDate: Date | null | string;
  bookmarks: number[];
}

const initialState: AuthState = {
  isLoginMode: true,
  userId: null,
  token: null,
  tokenExpirationDate: null,
  bookmarks: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        userId: string;
        token: string;
        tokenExpirationDate: string;
        bookmarks: number[];
      }>,
    ) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.tokenExpirationDate = action.payload.tokenExpirationDate;
      state.bookmarks = action.payload.bookmarks;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.tokenExpirationDate = null;
      state.bookmarks = [];
    },
    toggleLogin(state) {
      state.isLoginMode = !state.isLoginMode;
    },
    setAuthMode(state, action: PayloadAction<string>) {
      state.isLoginMode = action.payload === "login" ? true : false;
    },
    updateBookmarks(
      state,
      action: PayloadAction<{ id: number; operation: string }>,
    ) {
      const { id, operation } = action.payload;
      if (operation === "remove") {
        state.bookmarks === state.bookmarks.filter((itemId) => itemId !== id);
      } else {
        state.bookmarks.push(id);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
