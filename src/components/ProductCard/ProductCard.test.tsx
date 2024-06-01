import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import ProductCard from '.';

describe('Render Product Card component', () => {
  afterEach(() => {
    cleanup();
  });
  it('Render  defautl ProductCard successfully', () => {
    const srcImage = 'https://cdn-icons-png.flaticon.com/512/3731/3731072.png';

    const { getByRole, getByText, getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id='1'
            name='Tomate'
            price={10.5}
            img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
          />
        </MemoryRouter>
      </Provider>
    );

    getByText('Tomate');
    getByText('$10.50');
    const image = getByAltText('Imagen de Tomate') as HTMLImageElement;
    expect(image.src).toContain(srcImage);
    const button = getByRole('button', { name: 'Comprar' });
    expect(button).toBeInTheDocument();
  });

  it('should render favorite logo', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id='1'
            name='Tomate'
            price={10.5}
            img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
          />
        </MemoryRouter>
      </Provider>
    );
    const favButton = getByRole('button', { name: /heart/i });
    expect(favButton).toBeInTheDocument();
  });

  it('should render the "producto añadido" tag if you add it', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id='1'
            name='Tomate'
            price={10.5}
            img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
            isAdded
          />
        </MemoryRouter>
      </Provider>
    );
    getByText('Producto añadido');
  });

  it('should render the counter if you add the product', () => {
    const { getByRole, getByText, getAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id='1'
            name='Tomate'
            price={10.5}
            img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
          />
        </MemoryRouter>
      </Provider>
    );
    const buttonAddCart = getByRole('button', { name: /cart/i });
    fireEvent.click(buttonAddCart);
    const buttonAdd = getByRole('button', { name: /Añadir/i });
    fireEvent.click(buttonAdd);
    getByText('1');
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  it('should render the buy button to rediect the user to cart page', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id='1'
            name='Tomate'
            price={10.5}
            img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
          />
        </MemoryRouter>
      </Provider>
    );
    const btn = getByRole('button', { name: /Comprar/i });
    expect(btn).toBeInTheDocument();
  });
});
