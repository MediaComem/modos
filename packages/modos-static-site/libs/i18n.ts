import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { customFetch } from './index';

const JSON_LOCATION = '/lang/';

function i18n(pageName: string, value: string, languagesJson: any): string {
  if (
    !languagesJson ||
    !languagesJson[pageName] ||
    !languagesJson[pageName][value]
  ) {
    return '';
  }

  return languagesJson[pageName][value];
}

/**
 * Hooks that returns the current asset json of language
 * @returns A JSON parse dataset (a js object)
 */
function useGetLanguage() {
  const [language, setLanguage] = useState('fr');

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
    return data;
  }

  console.error('Error during fetching language', error);
  return null;
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
      i18n(pageName, value, lang);
  }

  return (value: string): string => i18n(defaultPageName, value, lang);
}

export { i18n, useGetLanguage, useI18N };
