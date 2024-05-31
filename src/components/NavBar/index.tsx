import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CaretCircleLeft, ShoppingCart, User } from '@phosphor-icons/react';
import { Container, IconButton } from '@mui/material';
import ROUTES from '../../shared/constants/routes';
import Logo from '../../assets/logoMinimalista.svg';
import { RootState } from '../../redux/store';
import { useMemo, useState } from 'react';
import ModalGuest from '../ModalGuest';
import { LITERAL } from '../../shared/constants/literal';

const NavBar = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const [openGuestModal, setOpenGuestModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = useMemo(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.count;
    });
    return total;
  }, [items]);

  const handlerProfile = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenGuestModal(true);
      return;
    }
    navigate(ROUTES.PROFILE);
  };

  return (
    <header className='relative z-50'>
      <ModalGuest
        open={openGuestModal}
        setOpen={setOpenGuestModal}
        title={LITERAL.modalCreateAccountTitle}
        description={LITERAL.modalCreateAccountDescription}
        onConfirm={() => navigate(ROUTES.PROFILE)}
      />

      <Container className='flex flex-row'>
        <div className='flex flex-row gap-12 py-3 xl:py-5  justify-between items-center'>
          {location.pathname === ROUTES.ROOT && (
            <Link
              to={ROUTES.ROOT}
              className='inline-flex gap-0 justify-center align-middle items-center'
            >
              <img src={Logo} alt='logo' className='w-[50px] lg:w-[60px]' />
              <span className='font-medium text-cyan-400 text-2xl hidden lg:block'>
                Mini<span className='text-cyan-800'>Mart</span>
              </span>
            </Link>
          )}
          {location.pathname !== ROUTES.ROOT && (
            <IconButton
              aria-label='go back'
              size='small'
              onClick={() => navigate(-1)}
            >
              <CaretCircleLeft size={36} />
            </IconButton>
          )}

          <div className='flex gap-2 flex-row justify-center items-center'>
            <div className='border border-slate-300 rounded-full size-9 justify-center items-center relative'>
              {totalItems > 0 && (
                <div className='absolute size-5 bg-red-600 rounded-full bottom-6 left-4 flex items-center justify-center'>
                  <span className='text-xs text-white'>{totalItems}</span>
                </div>
              )}
              <IconButton
                aria-label='cart'
                size='small'
                onClick={() => navigate(`${ROUTES.CART}`)}
              >
                <ShoppingCart size={22} />
              </IconButton>
            </div>

            <div className='border border-slate-300 rounded-full size-9 justify-center items-center'>
              <IconButton
                aria-label='profile'
                size='small'
                onClick={handlerProfile}
              >
                <User size={22} />
              </IconButton>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
