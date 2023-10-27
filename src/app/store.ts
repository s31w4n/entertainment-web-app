import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from '@/lib/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PURGE, REHYDRATE, REGISTER, PERSIST],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
