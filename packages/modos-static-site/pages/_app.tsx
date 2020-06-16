import React from 'react';
import { DefaultSeo } from 'next-seo';
import 'lazysizes';

import { useGetLanguage } from '../libs/index';
import { Layout } from '../components';

import '../style/index.scss';

function MyApp({ Component, pageProps }) {
  const { data } = useGetLanguage();
  pageProps.lang = data;

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
