import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import calendarReducer from './slices/calendarSlice';
import eventSlice from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    authReducer,
    calendarReducer,
    eventSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;