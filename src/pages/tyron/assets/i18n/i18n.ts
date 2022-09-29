import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';
import cn from './cn.json';
import id from './id.json';
import ru from './ru.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    es: es,
    cn: cn,
    id: id,
    ru: ru,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
