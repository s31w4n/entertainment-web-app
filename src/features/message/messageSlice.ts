import { createSlice } from "@reduxjs/toolkit";

interface MessageSliceProps {
  isLoginMessage: boolean;
}

const initialState: MessageSliceProps = {
  isLoginMessage: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showLoginMessage(state) {
      state.isLoginMessage = true;
    },
    hideLoginMessage(state) {
      state.isLoginMessage = false;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
