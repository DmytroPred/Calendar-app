import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import calendarReducer from './calendar/calendarSlice';

const store = configureStore({
  reducer: {
    authReducer,
    calendarReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;