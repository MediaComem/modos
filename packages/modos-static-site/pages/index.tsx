import Head from 'next/head';

import { Layout } from '../components/index';

const Home = () => (
  <>
    <Head>
      <title>MoDos</title>
      <link rel="icon" href="/favicon.ico" />
      
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
    </Head>

    <Layout></Layout>
  </>
);

export default Home;
