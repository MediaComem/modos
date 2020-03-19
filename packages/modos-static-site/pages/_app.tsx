import '../style/index.scss'

import { useGetLanguage } from '../libs/index';
import { Layout } from '../components';


function MyApp({ Component, pageProps }) {
  const { data } = useGetLanguage();
  pageProps.lang = data;
  
  return (
    
    <Layout lang={data}>
      <Component {...pageProps} />

    </Layout>
  );
}

export default MyApp;
