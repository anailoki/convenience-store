import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products.slice';
import cartReducer from './slices/cart.slice';
import alertReducer from './slices/alert.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
