import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { customFetch } from './index';

const JSON_LOCATION = '/lang/';

function i18n(pageName: string, value: string, languagesJson: any) {
  if (
    !languagesJson || languagesJson==''
  ) {
    return 'LanguagesJson null';
  }
  console.log(languagesJson);
  console.log(languagesJson['map']);
  if (
    !languagesJson[pageName]
  ) {
    return pageName+" not found";
  }

  if (
    !languagesJson[pageName][value]
  ) {
    return value+' not found';
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

/**
 * Hooks that return the translating function
 * @param defaultPageName you can use pass the pageName as parameter to avoid to retype it
 * @returns a function to translate
 */
 function useI18N(defaultPageName?: string): any {
  const lang = useGetLanguage();

  if (!lang) {
    return () => '';
  }

  if (!defaultPageName || defaultPageName === '') {
    return (pageName: string, value: string): string =>
      i18n(pageName, value, lang['data']);
  }

  return (value: string): string => i18n(defaultPageName, value, lang['data']);
}

export { i18n, useGetLanguage, useI18N };
