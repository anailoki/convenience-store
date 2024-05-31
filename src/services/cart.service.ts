import { TItem } from '../redux/slices/cart.slice';

type TShoppingCart = {
  productId: string;
  quantity: number;
  cartId?: string;
};

type ResponseShoppingCart = {
  cartId: string;
  message: string;
};

type TGetCart = {
  items: TItem[];
  total: number;
};

export const getShoppingCart = async (idCart: string): Promise<TGetCart> => {
  try {
    const response = await fetch(
      `http://localhost:3000/shopping-cart/${idCart}`
    );
    return response.json();
  } catch (error) {
    return { items: [], total: 0 };
  }
};

export const postShoppingCart = async (
  data: TShoppingCart
): Promise<ResponseShoppingCart> => {
  try {
    const response = await fetch('http://localhost:3000/shopping-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return { cartId: '', message: 'Error' };
  }
};
