import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import products from "@/data/products.json";
import { BASE_URL } from "@/lib/constants";

const pages = [
	{
		path: "",
		changeFrequency: "weekly",
		priority: 1,
	},
	{
		path: "/products",
		changeFrequency: "monthly",
		priority: 0.8,
	},
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const urls: MetadataRoute.Sitemap = [];
	const now = new Date();

	for (const page of pages) {
		const alternates: Record<string, string> = {};

		for (const locale of routing.locales) {
			alternates[locale] = `${BASE_URL}/${locale}${page.path}`;
		}

		alternates["x-default"] = `${BASE_URL}/uk${page.path}`;

		for (const locale of routing.locales) {
			urls.push({
				url: `${BASE_URL}/${locale}${page.path}`,
				lastModified: now,
				changeFrequency: page.changeFrequency,
				priority: page.priority,
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
