import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    displayName: '',
    age: 0,
    email: '',
    token: '',
  },
  reducers: {
    login: (state, action) => {
      state.displayName = action.payload.displayName;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.displayName = '';
      state.age = 0;
      state.email = '';
      state.token = '';
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
