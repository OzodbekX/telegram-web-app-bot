import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    fallbackLng: "uz",
    debug: true,
    resources: {
        en: { translation: en },
        ru: { translation: ru },
        uz: { translation: uz },
    },
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
    },
});
export default i18n;
