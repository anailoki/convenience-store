import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TItem = {
  id: string;
  name: string;
  price: number;
  count: number;
};

export interface ProductsState {
  items: TItem[];
  total: number;
  email?: string;
  address?: string;
  pickup?: boolean;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  email: '',
  address: '',
  pickup: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TItem>) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (!product) {
        state.items = [...state.items, action.payload];
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + action.payload.count }
            : item
        );
      }

      const total = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      state.total = total;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const total = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      state.total = total;
    },
    updateAmount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: action.payload.count }
          : item
      );
      const total = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      state.total = total;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, updateAmount, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
