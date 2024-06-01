import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import ProductCart from '.';

describe('Render Product Cart component', () => {
  afterEach(() => {
    cleanup();
  });
  it('Render  defautl ProductCard successfully', () => {
    const srcImage = 'https://cdn-icons-png.flaticon.com/512/3731/3731072.png';

    const { getAllByRole, getAllByText, getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCart
            name='Pepino'
            price={20}
            image={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
            countInit={2}
          />
        </MemoryRouter>
      </Provider>
    );

    getAllByText('Pepino');
    getAllByText('$20.00');
    getAllByText('2');
    const image = getByAltText(
      'Imagen del producto Pepino'
    ) as HTMLImageElement;
    expect(image.src).toContain(srcImage);
    const buttons = getAllByRole('button', { name: 'borrar producto' });
    expect(buttons.length).toBe(2);
  });
});
