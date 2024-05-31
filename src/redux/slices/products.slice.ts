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
  favorites: string[];
}

const initialState: ProductsState = {
  allCategories: [],
  allProducts: [],
  favorites: [],
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
    setFavorites: (state, action: PayloadAction<string>) => {
      const index = state.favorites.findIndex((id) => id === action.payload);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { setProducts, setCategories, setFavorites } =
  productsSlice.actions;

export default productsSlice.reducer;
