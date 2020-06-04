import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { customFetch } from './index';

const JSON_LOCATION = '/lang/';

function i18n(pageName: string, value: string, languagesJson: any) {
  if (
    !languagesJson ||
    !languagesJson[pageName] ||
    !languagesJson[pageName][value]
  ) {
    return `${pageName}.${value}`;
  }

  return languagesJson[pageName][value];
}

function useGetLanguage() {
  const [ language, setLanguage ] = useState('fr');

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
      setLanguage(lang);
    }
  });

  const { data, error } = useSWR(
    `${JSON_LOCATION}${language}.json`,
    customFetch
  );

  if (!error) {
    return { data };
  }
  console.error('Error during fetching language', error);
  return {};

}

export { i18n, useGetLanguage };
