import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Localization } from 'expo-localization';

import englishTranslation from './translation/translation-en.json';
import turkishTranslation from './translation/translation-tr.json';

const resources = {
  tr: {
    translation: turkishTranslation
  },
  en: {
    translation: englishTranslation
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: 'tr',
  lng: 'tr',
  resources,

  // have a common namespace used around the full app

  debug: true,

  interpolation: {
    escapeValue: false // not needed for react as it does escape per default to prevent xss!
  }
});

export default i18n;
