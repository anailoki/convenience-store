import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Alert, Slide } from '@mui/material';
import {
  SealCheck,
  Warning,
  WarningCircle,
  XCircle,
} from '@phosphor-icons/react';
import { hideAlert } from '../redux/slices/alert.slice';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.showAlert) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, alert.duration);
    }
  }, [alert, dispatch]);

  return (
    <div className='flex flex-col relative h-full w-full justify-between'>
      <NavBar />
      <div className='w-full h-full relative'>
        {alert.showAlert && (
          <div className='max-w-fit w-fit absolute z-30 right-0 flex justify-center items-center'>
            <Slide
              direction='left'
              in={alert.showAlert}
              mountOnEnter
              unmountOnExit
            >
              <Alert
                icon={
                  alert.type === 'error' ? (
                    <XCircle size={32} weight='fill' color='bg-red-500' />
                  ) : alert.type === 'info' ? (
                    <WarningCircle
                      size={32}
                      weight='fill'
                      color='bg-blue-500'
                    />
                  ) : alert.type === 'warning' ? (
                    <Warning size={32} weight='fill' color='bg-yellow-500' />
                  ) : (
                    <SealCheck size={32} weight='fill' color='bg-green-500' />
                  )
                }
                severity={alert.type}
                title={alert.title}
              >
                {alert.description}
              </Alert>
            </Slide>
          </div>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
