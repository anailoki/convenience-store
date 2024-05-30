import { Container } from '@mui/material';
import React from 'react';

const Product = () => {
  return (
    <Container>
      <div className='flex flex-row justify-between gap-x-4 xl:gap-x-10 bg-slate-200'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/3731/3731072.png'
          alt='Product'
          className='w-20 xl:w-96 h-fit'
        />
        <div className='w-full py-6 flex gap-y-2 flex-col'>
          <h3 className='text-2xl font-medium'>Platano</h3>
          <p>$10.65</p>
          <div></div>
        </div>
      </div>
    </Container>
  );
};

export default Product;
