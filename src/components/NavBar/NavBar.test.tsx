import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import NavBar from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import ROUTES from '../../shared/constants/routes';

describe('Render Nav Bar component', () => {
  it('should render 2 button', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );

    const button = getAllByRole('button');
    expect(button.length).toBe(2);
  });

  it('should render logo link', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );
    const link = getByRole('link', { name: /logo/i });
    expect(link).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', ROUTES.ROOT);
  });

  it('should render the cart button', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );
    const link = getByRole('button', { name: /cart/i });
    expect(link).toBeInTheDocument();
  });

  it('should render the profile button', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );
    const btn = getByRole('button', { name: /profile/i });
    expect(btn).toBeInTheDocument();
  });
});
