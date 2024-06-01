import { Container } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorImg from '../../assets/img/something-went-wrong-.webp';
import NavBar from '../../components/NavBar';
const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div id='error-page'>
      <NavBar />
      <Container className='!flex !flex-col justify-center items-center'>
        <p className='font-medium text-gray-500'>Oops!</p>
        <p className='font-medium text-gray-500'>Algo salio mal</p>
        <img src={ErrorImg} alt='Imagen de error' />
        <p>
          <i>{errorMessage}</i>
        </p>
      </Container>
    </div>
  );
};

export default ErrorPage;
