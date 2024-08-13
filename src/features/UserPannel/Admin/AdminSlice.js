import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteProduct, fetchCount } from './AdminAPI';

const initialState = {
  value: 0,
  status: 'idle',
  products: [], // Initialize products array
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);


export const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })

      
  },
});

export const { increment } = AdminSlice.actions;

export const selectCount = (state) => state.admin.value; // Make sure to select from the right slice

export default AdminSlice.reducer;
