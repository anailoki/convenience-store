import { useEffect, useState } from 'react';
import { Button, Container, Switch } from '@mui/material';
import { MapPinSimpleArea, SpinnerGap } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCart from '../../components/ProductCart';
import { RootState } from '../../redux/store';
import { UTILS } from '../../shared/utils/index';
import {
  clearCart,
  deleteProduct,
  updateAmount,
} from '../../redux/slices/cart.slice';
import ROUTES from '../../shared/constants/routes';
import EmptyCartImg from '../../assets/img/empty-cart.webp';
import Logo from '../../assets/logoMinimalista.svg';
import { LITERAL } from '../../shared/constants/literal';
import { PRODUCTS_IMG } from '../../shared/constants/images';
import { showAlert } from '../../redux/slices/alert.slice';

const Cart = () => {
  const { total, items } = useSelector((state: RootState) => state.cart);
  const [isPickup, setIsPickup] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPickup) {
      setDeliveryCost(100);
    } else {
      setDeliveryCost(0);
    }
  }, [isPickup]);

  const sendNotification = (title: string, body: string) => {
    const notifTitle = title;
    const notifBody = body;
    const options = {
      body: notifBody,
      icon: Logo,
    };
    if ('Notification' in window) {
      new Notification(notifTitle, options);
    } else {
      const alert = {
        type: 'success' as const,
        title: notifTitle,
        description: notifBody,
      };
      dispatch(showAlert(alert));
    }
  };

  const handlerDeleteItem = (id: string) => {
    dispatch(deleteProduct(id));
    sendNotification('Producto eliminado', LITERAL.productDeleted);
  };

  const handlerUpdateAmount = (id: string, count: number) => {
    dispatch(updateAmount({ id, count }));
  };

  const handlerPay = () => {
    setLoadingPurchase(true);
    setTimeout(() => {
      dispatch(clearCart());
      setLoadingPurchase(false);
      sendNotification('Compra realizada', LITERAL.purchaseSuccess);
      navigate(`${ROUTES.ROOT}`);
    }, 3000);
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
                  image={PRODUCTS_IMG[item.id]}
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
          disabled={items.length === 0 || loadingPurchase}
          onClick={handlerPay}
        >
          {loadingPurchase ? (
            <SpinnerGap className='animate-spin' size={32} />
          ) : (
            'Pagar'
          )}
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
