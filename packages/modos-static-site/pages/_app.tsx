import '../style/index.scss'

import { useGetLanguage } from '../libs/index';


function MyApp({ Component, pageProps }) {
  const { data } = useGetLanguage();
  pageProps.lang = data;

  return <Component {...pageProps} />;
}

export default MyApp;
