import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import uk from "./translations/uk/translation.json";
import en from "./translations/en/translation.json";
import cs from "./translations/cs/translation.json";

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            uk: {
                translation: uk,
            },
            en: {
                translation: en,
            },
            cs: {
                translation: cs,
            },
        },

        fallbackLng: "uk",

        detection: {
            order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],

            caches: ["localStorage", "cookie"],
        },

        interpolation: {
            escapeValue: false,
        },
    });
