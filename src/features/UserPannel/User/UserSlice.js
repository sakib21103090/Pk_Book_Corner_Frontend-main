import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, UpdateUserCheckOut } from './UserAPI';

const initialState = {
  userOrders:[],
  status: 'idle',
  userInfo:null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  'user/UpdateUser',
  async (user) => {
    const response = await UpdateUserCheckOut(user);
    return response.data;
  }
);


export const UserSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // store all the address with user information 
        state.userOrders = action.payload;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // store all the address with user information 
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // store all the address with user information 
        state.userInfo = action.payload;
      });
  },
});

export const selectUsersOrder = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const { increment} = UserSlice.actions;


export default UserSlice.reducer;
