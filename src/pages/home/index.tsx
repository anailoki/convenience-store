import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CategoryButton from '../../components/CategoryButton';
import ProductCard from '../../components/ProductCard';
import { CATEGORY_IMG } from '../../shared/constants/images';
import {
  getCategoriesApi,
  getProductsApi,
} from '../../services/products.service';
import BannerImg from '../../assets/img/_Banner.webp';
import ROUTES from '../../shared/constants/routes';
import { setCategories, setProducts } from '../../redux/slices/products.slice';
import { RootState } from '../../redux/store';
import { UTILS } from '../../shared/utils';

const Home = () => {
  const { allCategories, allProducts } = useSelector(
    (state: RootState) => state.products
  );
  const { items } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: 'Ocurrio un error, intenta de nuevo.',
  });
  const [alertWarning, setAlertWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAlert = () => {
    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
      });
    }, 15000);
  };

  const recommendedIdProducts = UTILS.generateRandomArray();

  useEffect(() => {
    if (allCategories.length && allProducts.length) {
      return;
    }
    setIsLoading(true);
    Promise.all([getCategoriesApi(), getProductsApi()])
      .then(([categories, products]) => {
        if (Array.isArray(categories)) {
          dispatch(setCategories(categories));
        }

        if (Array.isArray(products)) {
          dispatch(setProducts(products));
        }

        if (!Array.isArray(categories) || !Array.isArray(products)) {
          setAlert({
            show: true,
            message:
              'Ocurrio un error al mostrar las categorias o productos, intenta de nuevo',
          });
          hideAlert();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Notification.requestPermission().then((result) => {
      if (result !== 'granted') {
        setAlertWarning(true);
        setTimeout(() => {
          setAlertWarning(false);
        }, 5000);
      }
    });
  }, []);

  return (
    <section className='py-3'>
      <Container className='mt-4'>
        {alertWarning && (
          <Alert severity='warning' className='mb-4'>
            No se permitio el uso de las notificaciones
          </Alert>
        )}
        {alert.show && (
          <Alert severity='error' className='mb-4'>
            {alert.message}
          </Alert>
        )}
        <div className='flex flex-row overflow-x-auto gap-4 pb-4 w-full px-2 cursor-pointer'>
          {!isLoading &&
            allCategories.map(({ id, name }) => (
              <CategoryButton
                key={`category-${id}-${name}`}
                name={name}
                className='flex-shrink-0'
                img={CATEGORY_IMG[id]}
                onClick={() => navigate(`/catalog/?category=${id}`)}
              />
            ))}
          {isLoading &&
            Array.from({ length: 6 }, (_, i) => i + 1).map((_, i) => (
              <Skeleton
                key={`skeleton-${i}`}
                variant='rectangular'
                width={210}
                height={118}
              />
            ))}
        </div>

        <div
          className='my-4 xl:my-8 rounded-lg flex flex-row justify-between cursor-pointer'
          onClick={() => navigate(`${ROUTES.CATALOG}`)}
        >
          <img src={BannerImg} alt='banner image' />
        </div>

        <hr className='mt-10' />
        <div className='flex flex-row mt-4'>
          <p className='text-xl font-medium'>Recomendados</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pb-4'>
          {allProducts
            .filter((prod) => recommendedIdProducts.includes(Number(prod.id)))
            .map((product) => (
              <ProductCard
                id={product.id}
                key={product.name}
                name={product.name}
                price={product.price}
                img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
                isAdded={!!items.find((item) => item.id === product.id)}
              />
            ))}

          {isLoading &&
            Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
              <div key={`skeleton-prod-${i}`}>
                <Skeleton variant='rectangular' width='100%' height={120} />
                <Skeleton variant='text' />
                <Skeleton variant='text' />
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default Home;
