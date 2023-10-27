import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoginMode: boolean;
  userId: string | null;
  bookmarks: number[];
}

const initialState: AuthState = {
  isLoginMode: true,
  userId: null,
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
        bookmarks: number[];
      }>,
    ) {
      state.userId = action.payload.userId;
      state.bookmarks = action.payload.bookmarks;
    },
    logout(state) {
      state.userId = null;
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
      if (operation === "pull") {
        state.bookmarks === state.bookmarks.filter((itemId) => itemId !== id);
      } else {
        state.bookmarks.push(id);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
