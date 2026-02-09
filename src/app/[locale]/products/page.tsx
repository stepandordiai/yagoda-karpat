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
	const baseUrl = "https://www.yagodakarpat.com";

	return {
		title: `${t("products.title")
			.split(" ")
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(" ")} | ${t("company_name")}`,
		description: t("home.desc_seo"),
		alternates: {
			canonical: `${baseUrl}/${locale}/products`,
			languages: {
				uk: `${baseUrl}/uk/products`,
				en: `${baseUrl}/en/products`,
				cs: `${baseUrl}/cs/products`,
				"x-default": `${baseUrl}/uk/products`,
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
