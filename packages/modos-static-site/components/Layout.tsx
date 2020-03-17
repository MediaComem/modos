import Head from 'next/head'

import {Header} from './index';


const Layout = props => (
  <div className="layout">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      
    </main>

    <footer>
      
    </footer>

    {props.children}
  </div>
);

export {Layout};
