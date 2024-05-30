import React from 'react';
import NavBar from '../components/NavBar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col relative h-full w-full justify-between'>
      <NavBar />

      <div className=' w-full h-full'>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
