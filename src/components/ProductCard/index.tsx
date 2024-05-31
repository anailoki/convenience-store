import { Button, IconButton, Slide } from '@mui/material';
import { Heart, ShoppingCart, SpinnerGap } from '@phosphor-icons/react';
import { useState } from 'react';
import ModalGuest from '../ModalGuest';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../shared/constants/routes';
import Counter from '../Counter';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/cart.slice';
import { UTILS } from '../../shared/utils';
import { postShoppingCart } from '../../services/cart.service';
import { showAlert } from '../../redux/slices/alert.slice';
import { LITERAL } from '../../shared/constants/literal';
import Logo from '../../assets/logoMinimalista.svg';
import { setFavorites } from '../../redux/slices/products.slice';
import { RootState } from '../../redux/store';
interface IProductCardProps {
  id: string;
  name: string;
  price: number;
  img: string;
  onClick?: () => void;
  isAdded?: boolean;
}

const ProductCard = ({
  id,
  name,
  img,
  price,
  isAdded,
  onClick,
}: IProductCardProps) => {
  const { favorites } = useSelector((state: RootState) => state.products);
  const [openGuestModal, setOpenGuestModal] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerGoToCart = async () => {
    try {
      setIsLoading(true);

      const idCart = sessionStorage.getItem('cartId');
      const response = await postShoppingCart({
        productId: id,
        quantity: count,
        cartId: idCart || '',
      });
      if (response.message.includes('successfully')) {
        if (!idCart) {
          sessionStorage.setItem('cartId', response.cartId);
        }
        dispatch(
          addProduct({
            id,
            name,
            price,
            count: showCounter ? count : 1,
          })
        );
        if (!showCounter) {
          navigate(`${ROUTES.CART}`);
        } else {
          cartNotification();
          setShowCounter(false);
        }
      } else {
        const alert = {
          type: 'error' as const,
          title: 'Error',
          description: LITERAL.errorAddProduct,
        };
        dispatch(showAlert(alert));
      }
    } catch (error) {
      const alert = {
        type: 'error' as const,
        title: 'Error',
        description: LITERAL.errorAddProduct,
      };
      dispatch(showAlert(alert));
    } finally {
      setIsLoading(false);
    }
  };

  const handlerChangeCount = (count: number) => {
    setCount(count);
    if (count > 0) {
      setShowCounter(true);
    } else {
      setShowCounter(false);
    }
  };
  const cartNotification = () => {
    const notifTitle = 'Producto añadido al carrito';
    const notifBody = 'Revisa tu carrito para finalizar la compra';
    const options = {
      body: notifBody,
      icon: Logo,
    };
    new Notification(notifTitle, options);
  };

  const handlerFavorite = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenGuestModal(true);
      return;
    }
    dispatch(setFavorites(id));
  };

  return (
    <div className='relative bg-slate-50 shadow rounded-md p-4 flex flex-col hover:shadow-lg transition duration-300 ease-in-out cursor-pointer'>
      <ModalGuest
        open={openGuestModal}
        setOpen={setOpenGuestModal}
        title={LITERAL.modalGuestTitle}
        description={LITERAL.modalGuestDescription}
      />
      {isAdded && (
        <Slide direction='right' in={isAdded} mountOnEnter unmountOnExit>
          <div className='bg-lime-200 absolute top-5 left-0 rounded-r-xl px-2'>
            <span className='text-[12px] text-green-600 font-medium'>
              Producto añadido
            </span>
          </div>
        </Slide>
      )}
      <div className='flex justify-end'>
        <IconButton
          onClick={handlerFavorite}
          className='!px-0'
          aria-label='heart'
        >
          {favorites.includes(id) ? (
            <Heart size={20} weight='fill' color='#da1e28' />
          ) : (
            <Heart size={20} />
          )}
        </IconButton>
      </div>
      <div onClick={onClick}>
        <img
          src={img}
          alt='Product'
          className='h-20 max-h-20 md:h-40 md:max-h-40 mx-auto'
        />
        <div className='flex flex-col items-center'>
          <p className='text-lg font-bold text-center py-1 leading-none mt-2'>
            {name}
          </p>
          <p className='text-md'>{UTILS.formatCurrency(price)}</p>
        </div>
      </div>

      <div
        className={`flex ${
          showCounter ? 'flex-col' : 'flex-row'
        }  gap-3 sm:flex-row mt-2  justify-center xl:justify-between`}
      >
        {!showCounter ? (
          <>
            <div className='border border-slate-300 rounded-full lg:hidden h-fit'>
              <IconButton
                aria-label='cart'
                size='small'
                onClick={() => setShowCounter(true)}
              >
                <ShoppingCart size={20} />
              </IconButton>
            </div>
            <Button
              disabled={isLoading}
              variant='outlined'
              className='!hidden lg:!block !normal-case w-full h-8 !leading-none'
              size='small'
              onClick={() => setShowCounter(true)}
            >
              {isLoading ? (
                <SpinnerGap className='animate-spin' size={32} />
              ) : (
                <span>Añadir al carrito</span>
              )}
            </Button>
          </>
        ) : (
          <Counter onChage={handlerChangeCount} countInit={1} />
        )}

        <Button
          disabled={isLoading}
          variant='contained'
          size='small'
          className={`!normal-case w-full   h-8 ${
            showCounter ? 'sm:w-fit' : 'w-full'
          }`}
          onClick={handlerGoToCart}
        >
          {isLoading ? (
            <SpinnerGap className='animate-spin' size={32} />
          ) : showCounter ? (
            'Añadir'
          ) : (
            'Comprar'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
