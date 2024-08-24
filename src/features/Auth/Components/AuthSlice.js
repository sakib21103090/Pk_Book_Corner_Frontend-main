import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser, LoginUser, SignOut } from './AuthAPI';

// Load user from localStorage if available
const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  loginInUser: savedUser || null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await CreateUser(userData);
    return response.data;
  }
);

export const LoginUserAsync = createAsyncThunk(
  'user/LoginUser',
  async (LogInfo) => {
    const response = await LoginUser(LogInfo);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await SignOut();
    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginInUser = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginInUser = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loginInUser = null;
        localStorage.removeItem('user'); // Remove user from localStorage
      });
  },
});

export const selectLoginInUser = (state) => state.auth.loginInUser;
export const selectError = (state) => state.auth.error;

export default AuthSlice.reducer;
