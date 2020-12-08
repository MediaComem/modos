import React from 'react';
import { DefaultSeo } from 'next-seo';
import 'lazysizes';

import { Layout } from '../components';

import Head from 'next/head';

// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../style/index.scss';

function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith('/map')) {
    return (
      <>
        <Head>
          <title>MoDos</title>
          <link rel='icon' href='/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
            rel='stylesheet'></link>
        </Head>
        <Component />
      </>
    );
  }

  return (
    <>
      <DefaultSeo
        titleTemplate='MoDos | %s'
        openGraph={{
          type: 'website',
          locale: 'fr_CH',
          url: 'https://www.modos.heig-vd.ch/',
          site_name: 'MoDos'
        }}
      />

      <Layout>
        <Component />
      </Layout>
    </>
  );
}

export default MyApp;
