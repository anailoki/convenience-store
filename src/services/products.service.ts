import { TCategories, TProducts } from '../redux/slices/products.slice';

export const getProductsApi = async (): Promise<TCategories | unknown> => {
  try {
    const response = await fetch('http://localhost:3000/products');
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getCategoriesApi = async (): Promise<TProducts | unknown> => {
  try {
    const response = await fetch('http://localhost:3000/categories');
    return response.json();
  } catch (error) {
    return error;
  }
};
