import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import products from "@/lib/data/products-data.json";

const BASE_URL = "https://www.yagodakarpat.com";
const staticPages = ["", "/products"];

export default function sitemap(): MetadataRoute.Sitemap {
	const urls: MetadataRoute.Sitemap = [];
	const now = new Date();

	for (const page of staticPages) {
		const alternates: Record<string, string> = {};

		for (const locale of routing.locales) {
			alternates[locale] = `${BASE_URL}/${locale}${page}`;
		}

		alternates["x-default"] = `${BASE_URL}/uk${page}`;

		for (const locale of routing.locales) {
			urls.push({
				url: `${BASE_URL}/${locale}${page}`,
				lastModified: now,
				changeFrequency: "monthly",
				priority: page === "" ? 1 : 0.9,
				alternates: {
					languages: alternates,
				},
			});
		}
	}

	const productUrls = routing.locales.flatMap((locale) =>
		products.map((page) => ({
			url: `${BASE_URL}/${locale}/products/${page}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
			alternates: {
				languages: {
					uk: `${BASE_URL}/uk/products/${page}`,
					en: `${BASE_URL}/en/products/${page}`,
					cs: `${BASE_URL}/cs/products/${page}`,
					"x-default": `${BASE_URL}/${routing.defaultLocale}/products/${page}`,
				},
			},
		})),
	);

	return [...urls, ...productUrls];
}
