import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/BookList/Components/BooksSlice';
import cartReducer from '../features/Cart/CartSlice';
import authReducer from '../features/Auth/Components/AuthSlice';
import orderReducer from '../features/Orders/OrdersSlice';
import userReducer from '../features/UserPannel/User/UserSlice';
import adminReducer from '../features/UserPannel/Admin/AdminSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer,
    auth:authReducer,
    admin:adminReducer,
    order:orderReducer,
    user:userReducer,
    
  },
});
