import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Pagination,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Funnel, MagnifyingGlass, Trash, X } from '@phosphor-icons/react';

import ProductCard from '../../components/ProductCard';
import Collapse from '../../components/Collapse';
import NotFound from '../../assets/img/not-found.webp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  getCategoriesApi,
  getProductsApi,
} from '../../services/products.service';
import {
  setCategories,
  setProducts as setProductState,
} from '../../redux/slices/products.slice';

const itemsPerPage = 8;

const Catalog = () => {
  const { allCategories, allProducts } = useSelector(
    (state: RootState) => state.products
  );
  const { items } = useSelector((state: RootState) => state.cart);
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [priceOrder, setPriceOrder] = useState<'lower' | 'higher' | ''>('');
  const [products, setProducts] = useState(allProducts);
  const [page, setPage] = React.useState(1);
  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(
    Math.ceil(products.length / itemsPerPage)
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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
          dispatch(setProductState(products));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const categoriesParams = searchParams.getAll('category');
    setCategoriesSelected(categoriesParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;

    if (categoriesSelected.length === 0) {
      const selectedItems = allProducts.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      setProducts(selectedItems);
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
      return;
    }

    const productsFilters = allProducts.filter((product) =>
      categoriesSelected.includes(product.category)
    );

    const items = productsFilters.slice(startIndex, startIndex + itemsPerPage);
    setProducts(items);
    setTotalPages(Math.ceil(productsFilters.length / itemsPerPage));
  }, [categoriesSelected, page, allProducts]);

  useEffect(() => {
    let sortProducts = [...products];
    if (priceOrder === 'lower') {
      sortProducts = sortProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (priceOrder === 'higher') {
      sortProducts = sortProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
    setProducts(sortProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceOrder]);

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    if (event.target.checked) {
      setCategoriesSelected([...categoriesSelected, event.target.name]);
    } else {
      setCategoriesSelected(
        categoriesSelected.filter((category) => category !== event.target.name)
      );
    }
  };

  const handleChangeSortPrice = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceOrder(event.target.value as 'lower' | 'higher');

  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  const handlerSearch = () => {
    if (search === '') {
      return;
    }
    const startIndex = (page - 1) * itemsPerPage;
    const _productsFilters = allProducts
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(startIndex, startIndex + itemsPerPage);
    setProducts(_productsFilters);

    setTotalPages(Math.ceil(_productsFilters.length / itemsPerPage));
  };

  useEffect(() => {
    handlerSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handlerClearSearch = () => {
    const selectedItems = allProducts.slice(0, itemsPerPage);
    setProducts(selectedItems);
    setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
    setSearch('');
    setPage(1);
  };

  return (
    <Container className='pb-3'>
      <Drawer anchor='right' open={openDrawer} onClose={toggleDrawer(false)}>
        {categoriesSelected.length > 0 && (
          <Button
            className='!my-2'
            size='small'
            startIcon={<Trash size={18} />}
            onClick={() => setCategoriesSelected([])}
          >
            Limpiar Filtros
          </Button>
        )}
        <Collapse label='categorias' isOpen={true}>
          <FormGroup>
            {allCategories.map(({ id, name }) => (
              <FormControlLabel
                key={`category-${id}-${name}`}
                control={
                  <Checkbox
                    name={id}
                    onChange={handleChangeCategory}
                    checked={categoriesSelected.includes(id)}
                  />
                }
                label={name}
              />
            ))}
          </FormGroup>
        </Collapse>

        {/* <Collapse label='precio'>
          <FormControl>
            <RadioGroup
              aria-labelledby='radio-buttons-group-label'
              name='radio-buttons-group'
              onChange={handleChangeSortPrice}
              value={priceOrder}
            >
              <FormControlLabel
                value='lower'
                control={<Radio />}
                label='Menor a mayor'
              />
              <FormControlLabel
                value='higher'
                control={<Radio />}
                label='Mayor a menor'
              />
            </RadioGroup>
          </FormControl>
        </Collapse> */}
      </Drawer>

      <div className='flex flex-col lg:flex-row justify-between mb-4'>
        <h2 className='text-2xl font-medium pb-2'>Todos los productos</h2>
        <div className='border border-slate-300 rounded-full flex jusify-between w-full lg:w-fit'>
          <InputBase
            sx={{ ml: 1, flex: 1, width: 300 }}
            placeholder='¿Que producto deseas buscar?'
            inputProps={{ 'aria-label': 'buscar productos' }}
            size='medium'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IconButton
            type='button'
            sx={{ p: '10px' }}
            aria-label='search'
            onClick={handlerClearSearch}
          >
            {search.length > 0 ? (
              <X size={20} />
            ) : (
              <MagnifyingGlass size={20} />
            )}
          </IconButton>
        </div>
        <p className='my-1'>Resultados: {products.length}</p>
      </div>

      <hr />

      <div className='flex flex-col md:flex-row justify-between gap-x-4 xl:gap-8'>
        <div className='mt-5 hidden lg:block'>
          <h3 className='text-lg font-medium'>Filtros</h3>
          {categoriesSelected.length > 0 && (
            <Button
              className='!my-2'
              size='small'
              endIcon={<Trash size={18} />}
              onClick={() => setCategoriesSelected([])}
            >
              Limpiar Filtros
            </Button>
          )}
          <Collapse label='categorias' isOpen={true}>
            <FormGroup>
              {allCategories.map(({ id, name }) => (
                <FormControlLabel
                  key={`category-${id}-${name}`}
                  control={
                    <Checkbox
                      name={id}
                      onChange={handleChangeCategory}
                      checked={categoriesSelected.includes(id)}
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </Collapse>

          <Collapse label='precio'>
            <FormControl>
              <RadioGroup
                aria-labelledby='radio-buttons-group-label'
                name='radio-buttons-group'
                // defaultValue='lower'
                onChange={handleChangeSortPrice}
                value={priceOrder}
              >
                <FormControlLabel
                  value='lower'
                  control={<Radio />}
                  label='Menor a mayor'
                />
                <FormControlLabel
                  value='higher'
                  control={<Radio />}
                  label='Mayor a menor'
                />
              </RadioGroup>
            </FormControl>
          </Collapse>
        </div>

        <div className='w-full'>
          <div className='lg:hidden flex w-full flex-row justify-between'>
            <Button
              className='!my-2'
              size='small'
              startIcon={<Funnel size={18} />}
              onClick={() => setOpenDrawer(true)}
            >
              Filtros
            </Button>
            {categoriesSelected.length > 0 && (
              <Button
                className='!my-2'
                size='small'
                startIcon={<Trash size={18} />}
                onClick={() => setCategoriesSelected([])}
              >
                Limpiar Filtros
              </Button>
            )}
          </div>

          {isLoading && <p className='text-center'>Cargando...</p>}

          {products.length > 0 && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 pb-4'>
              {products.map(({ name, price, id }) => (
                <ProductCard
                  key={`product-${id}-${name}`}
                  name={name}
                  price={price}
                  id={id}
                  img='https://cdn-icons-png.flaticon.com/512/3731/3731072.png'
                  isAdded={!!items.find((item) => item.id === id)}
                />
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div className='flex justify-center mt-3'>
              <Pagination
                count={totalPages}
                shape='rounded'
                onChange={handleChangePagination}
                page={page}
              />
            </div>
          )}
          {products.length === 0 && !isLoading && (
            <div className='grid justify-items-center'>
              <img src={NotFound} alt='Not found' />
              <p className='text-center'>No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
