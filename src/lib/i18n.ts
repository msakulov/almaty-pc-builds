import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "./locales/ru";
import { kz } from "./locales/kz";
import { en } from "./locales/en";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      kz: { translation: kz },
      en: { translation: en },
    },
    lng: "ru",
    fallbackLng: "ru",
    supportedLngs: ["ru", "kz", "en"],
    interpolation: { escapeValue: false },
  });
}

export default i18n;

