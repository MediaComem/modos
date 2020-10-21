import React from 'react';
import { Header, Footer } from '../index';

const Layout = props => (
  <div className='layout'>
    <Header />

    <main>{props.children}</main>

    <Footer />
  </div>
);
export { Layout };
