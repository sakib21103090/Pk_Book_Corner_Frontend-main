import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser, LoginUser, SignOut } from './AuthAPI';
// import { UpdateUserCheckOut } from "../../UserPannel/User/UserAPI";

const initialState = {
  loginInUser: null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await CreateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
// export const UpdateUserCheckOutAsync = createAsyncThunk(
//   'user/UpdateUserCheckOut',
//   async (update) => {
//     const response = await UpdateUserCheckOut(update);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
// check==Login
export const LoginUserAsync = createAsyncThunk(
  'user/LoginUser',
  async (LogInfo) => {
    const response = await LoginUser(LogInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
// signOut
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (LogInfo) => {
    const response = await SignOut(LogInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginInUser = action.payload;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginInUser = action.payload;
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      // // update user for checkout
      // .addCase(UpdateUserCheckOutAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(UpdateUserCheckOutAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loginInUser = action.payload;
      // })
        // signOut user for checkout
        .addCase(signOutAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(signOutAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.loginInUser = null;
        })
    
  },
});

export const selectLoginInUser = (state) => state.auth.loginInUser;
export const selectError = (state) => state.auth.error;

export default AuthSlice.reducer;
