import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, deleteOrder, fetchAllOrders, updateOrder } from './OrderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteOrderAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (orderId) => {
    const response = await deleteOrder(orderId);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "product/fetchAllOrders",
  async () => {
    const response = await fetchAllOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder:(state)=>{
      state.currentOrder=null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders.splice(index, 1);
        }
      })
  },
});

export const {resetOrder}=orderSlice.actions;
export const selectAllOrders = (state) => state.order.orders;
export const selectCurrentOrder=(state)=>state.order.currentOrder;

export default orderSlice.reducer;
