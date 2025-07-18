import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import uk from "./assets/translations/uk/translation.json";
import en from "./assets/translations/en/translation.json";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources: {
			uk: {
				translation: uk,
			},
			en: {
				translation: en,
			},
		},

		fallbackLng: "uk",
		supportedLngs: ["uk", "en"],

		detection: {
			order: ["path", "localStorage", "navigator"],
			lookupFromPathIndex: 0,
			caches: ["localStorage", "cookie"],
		},

		interpolation: {
			escapeValue: false,
		},

		react: {
			useSuspense: false,
		},
	});
