import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TCategories = {
  id: string;
  name: string;
};

export type TProducts = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export interface ProductsState {
  allProducts: TProducts[];
  allCategories: TCategories[];
}

const initialState: ProductsState = {
  allCategories: [],
  allProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProducts[]>) => {
      state.allProducts = action.payload;
    },
    setCategories: (state, action: PayloadAction<TCategories[]>) => {
      state.allCategories = action.payload;
    },
  },
});

export const { setProducts, setCategories } = productsSlice.actions;

export default productsSlice.reducer;
