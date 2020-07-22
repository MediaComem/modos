import React from 'react';
import { DefaultSeo } from 'next-seo';
import 'lazysizes';

import { useGetLanguage } from '../libs/index';
import { Layout } from '../components';

import Head from 'next/head';


import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../style/index.scss';

function MyApp({ Component, pageProps, router }) {
  const { data } = useGetLanguage();
  pageProps.lang = data;

  if (router.pathname.startsWith('/map')) {
    return <>
      <Head>
        <title>MoDos</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        ></link>
      </Head>
      <Component {...pageProps} />
    </>;
  }


  return (
    <>
      <DefaultSeo
        titleTemplate = 'MoDos | %s'
        openGraph={{
          type: 'website',
          locale: 'fr_CH',
          url: 'https://www.modos.heig-vd.ch/',
          site_name: 'MoDos'
        }}
      />

      <Layout lang={data}>
        <Component {...pageProps} />

      </Layout>
    </>
  );
}

export default MyApp;
