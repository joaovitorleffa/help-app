import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_br from './pt_br/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    pt_br: { translation: pt_br },
  },
  lng: 'pt_br',
  fallbackLng: 'pt_br',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
