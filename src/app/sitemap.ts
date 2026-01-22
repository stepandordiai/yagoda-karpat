import type { MetadataRoute } from "next";

// TODO: LEARN THIS
const BASE_URL = "https://www.yagodakarpat.com";
const locales = ["uk", "en", "cs"] as const;

const staticPages = ["", "/products"];

const productIds = [
	"frozen-bilberries",
	"frozen-lingonberries",
	"frozen-rosehips",
	"frozen-plums",
	"dried-plums",
	"prunes",
	"frozen-elderberries",
	"frozen-strawberries",
	"frozen-raspberries",
	"frozen-apricots",
	"frozen-red-bell-peppers",
	"frozen-green-bell-peppers",
	"frozen-yellow-bell-peppers",
	"frozen-mixed-bell-peppers",
	"frozen-porcini-mushrooms",
	"fresh-porcini-mushrooms",
	"dried-porcini-mushrooms",
	"fresh-chanterelles",
	"dried-chanterelles",
	"frozen-sour-cherries",
	"frozen-honey-mushrooms",
	"frozen-blackberries",
	"frozen-grapes",
	"frozen-sweet-corn",
	"frozen-black-currants",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const urls: MetadataRoute.Sitemap = [];
	const now = new Date();

	for (const page of staticPages) {
		const alternates: Record<string, string> = {};

		for (const locale of locales) {
			alternates[locale] = `${BASE_URL}/${locale}${page}`;
		}

		alternates["x-default"] = `${BASE_URL}/uk${page}`;

		for (const locale of locales) {
			urls.push({
				url: `${BASE_URL}/${locale}${page}`,
				lastModified: now,
				alternates: {
					languages: alternates,
				},
			});
		}
	}

	for (const page of productIds) {
		const alternates: Record<string, string> = {};

		for (const locale of locales) {
			alternates[locale] = `${BASE_URL}/${locale}/products/${page}`;
		}

		alternates["x-default"] = `${BASE_URL}/uk/products/${page}`;

		for (const locale of locales) {
			urls.push({
				url: `${BASE_URL}/${locale}/products/${page}`,
				lastModified: now,
				alternates: {
					languages: alternates,
				},
			});
		}
	}

	return urls;
}
