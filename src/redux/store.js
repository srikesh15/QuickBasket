import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import locationReducer from './slices/locationSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    location: locationReducer,
    wishlist: wishlistReducer,
  },
});