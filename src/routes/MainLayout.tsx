import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../layout';

const MainLayout: React.FC<PropsWithChildren> = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
