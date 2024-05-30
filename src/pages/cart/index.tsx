import { useEffect, useState } from 'react';
import { Button, Container, Switch } from '@mui/material';
import { MapPinSimpleArea } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCart from '../../components/ProductCart';
import { RootState } from '../../redux/store';
import { UTILS } from '../../shared/utils/index';
import { deleteProduct, updateAmount } from '../../redux/slices/cart.slice';
import ROUTES from '../../shared/constants/routes';
import EmptyCartImg from '../../assets/img/empty-cart.webp';

const Cart = () => {
  const { total, items } = useSelector((state: RootState) => state.cart);
  const [isPickup, setIsPickup] = useState(true);
  const [deliveryCost, setDeliveryCost] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPickup) {
      setDeliveryCost(100);
    } else {
      setDeliveryCost(0);
    }
  }, [isPickup]);

  const handlerDeleteItem = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handlerUpdateAmount = (id: string, count: number) => {
    dispatch(updateAmount({ id, count }));
  };

  return (
    <Container className='!flex !flex-col md:!flex-row justify-between gap-6 md:gap-10'>
      <div className='w-full'>
        <h3 className='font-medium text-2xl mb-4'>Orden</h3>

        {items.length === 0 ? (
          <div className='flex flex-col justify-center  items-center'>
            <img src={EmptyCartImg} alt='Carrito vacio' className='w-fit ' />
            <p className='text-center mb-4 text-gray-400'>Carrito vacío</p>
            <Button
              className='w-full md:w-fit'
              variant='outlined'
              onClick={() => navigate(`${ROUTES.CATALOG}`)}
            >
              Agregar productos
            </Button>
          </div>
        ) : (
          <div className='md:border md:border-slate-300 rounded-2xl p-2 overflow-y-auto h-64 md:h-[400px]'>
            {items.map((item, index) => (
              <div key={`${item.name}-${index}`}>
                <ProductCart
                  name={item.name}
                  image='https://cdn-icons-png.flaticon.com/512/3731/3731072.png'
                  price={item.price * item.count}
                  countInit={item.count}
                  onDelete={() => handlerDeleteItem(item.id)}
                  onChangeAmount={(count) =>
                    handlerUpdateAmount(item.id, count)
                  }
                />
                {items.length !== index + 1 && (
                  <hr className='hidden md:block' />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <hr className='md:hidden' />
      <div className='w-full md:w-1/3'>
        <p className='font-medium text-2xl mb-4'>Resumen</p>
        <div>
          <span className='inline-flex gap-x-1'>
            <MapPinSimpleArea size={20} />
            Recoger en tienda
          </span>
          <Switch
            defaultChecked
            onChange={(e) => setIsPickup(e.target.checked)}
            checked={isPickup}
            inputProps={{ 'aria-label': 'pickup' }}
          />
        </div>
        <hr />

        <p className='flex justify-between py-2'>
          <span className='font-medium'>Subtotal</span>
          <span>{UTILS.formatCurrency(total)}</span>
        </p>
        <p className='flex justify-between py-2'>
          <span className='font-medium'>Costo de envío</span>
          <span>{UTILS.formatCurrency(deliveryCost)}</span>
        </p>
        <hr />
        <p className='flex justify-between py-2 mb-2'>
          <span className='font-medium text-xl'>Total</span>
          <span>{UTILS.formatCurrency(total + deliveryCost)}</span>
        </p>
        <Button
          variant='contained'
          className='w-full'
          disabled={items.length === 0}
        >
          Pagar
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
