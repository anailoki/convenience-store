import { Button, IconButton } from '@mui/material';
import { Heart, ShoppingCart } from '@phosphor-icons/react';
import { useState } from 'react';
import ModalGuest from '../ModalGuest';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../shared/constants/routes';
import Counter from '../Counter';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slices/cart.slice';
import { UTILS } from '../../shared/utils';

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
  const [openGuestModal, setOpenGuestModal] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerGoToCart = () => {
    dispatch(addProduct({ id, name, price, count: showCounter ? count : 1 }));
    if (!showCounter) {
      navigate(`${ROUTES.CART}`);
    } else {
      setShowCounter(false);
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

  return (
    <div className='relative bg-slate-50 shadow rounded-md p-4 flex flex-col hover:shadow-lg transition duration-300 ease-in-out cursor-pointer'>
      <ModalGuest open={openGuestModal} setOpen={setOpenGuestModal} />
      {isAdded && (
        <div className='bg-lime-200 absolute top-5 left-0 rounded-r-xl px-2'>
          <span className='text-[12px] text-green-600 font-medium'>
            Producto añadido
          </span>
        </div>
      )}
      <div className='flex justify-end'>
        <IconButton onClick={() => setOpenGuestModal(true)} className='!px-0'>
          <Heart size={20} />
        </IconButton>
      </div>
      <div onClick={onClick}>
        <img src={img} alt='Product' className='w-40 h-fit mx-auto' />
        <div className='flex flex-col items-center'>
          <p className='text-lg font-bold text-center py-1 leading-none'>
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
              variant='outlined'
              className='!hidden lg:!block !normal-case w-full h-8 !leading-none'
              size='small'
              onClick={() => setShowCounter(true)}
            >
              <span>Añadir al carrito</span>
            </Button>
          </>
        ) : (
          <Counter onChage={handlerChangeCount} countInit={1} />
        )}

        <Button
          variant='contained'
          size='small'
          className={`!normal-case w-full   h-8 ${
            showCounter ? 'sm:w-fit' : 'w-full'
          }`}
          onClick={handlerGoToCart}
        >
          {showCounter ? 'Añadir' : 'Comprar'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
