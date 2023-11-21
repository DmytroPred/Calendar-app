import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  uid: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;