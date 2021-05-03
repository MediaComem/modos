import React from 'react';
import { DefaultSeo } from 'next-seo';
import 'lazysizes';

import { useGetLanguage } from '../libs/index';
import { Layout } from '../components';

import Head from 'next/head';

import '../style/index.scss';
import 'react-leaflet-markercluster/dist/styles.min.css';

function MyApp({ Component, pageProps, router }) {
  const { data } = useGetLanguage();
  pageProps.lang = data;
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
        titleTemplate = 'MoDos SofaApp | %s'
        openGraph={{
          type: 'website',
          locale: 'fr_CH',
          site_name: 'MoDos - SofaApp'
        }}
      />

      <Layout lang={data}>
        <Component {...pageProps} />

      </Layout>
    </>
  );
}

export default MyApp;
