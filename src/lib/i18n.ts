import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { ru } from "./locales/ru";
import { kz } from "./locales/kz";
import { en } from "./locales/en";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        ru: { translation: ru },
        kz: { translation: kz },
        en: { translation: en },
      },
      fallbackLng: "ru",
      supportedLngs: ["ru", "kz", "en"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "lang",
      },
    });
}

export default i18n;
