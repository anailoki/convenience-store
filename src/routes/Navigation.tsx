import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home';
import ErrorPage from '../pages/error';
import ROUTES from '../shared/constants/routes';
import MainLayout from './MainLayout';
import Product from '../pages/product';
import Catalog from '../pages/catalog';
import Cart from '../pages/cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCT,
        element: <Product />,
      },
      {
        path: ROUTES.CATALOG,
        element: <Catalog />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
    ],
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const Navigation = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default Navigation;
