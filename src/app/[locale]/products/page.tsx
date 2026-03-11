import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import ProductsClient from "./Products.client";
import "./Products.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	const locales = ["uk", "en", "cs"];
	const alternates = Object.fromEntries(
		locales.map((l) => [l, `/${l}/products`]),
	);

	return {
		title: `${t("products.title")
			.split(" ")
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(" ")} | ${t("company_name")}`,
		description: t("home.desc_seo"),
		alternates: {
			canonical: `/${locale}/products`,
			languages: {
				...alternates,
				"x-default": `/uk/products`,
			},
		},
	};
}

export default async function Products() {
	const t = await getTranslations();

	return (
		<main className="js-products">
			<Breadcrumbs homeTitle={t("home_title")} title={t("products_title")} />
			<h1 className="products__title">{t("products.title")}</h1>
			<ProductsClient />
		</main>
	);
}
