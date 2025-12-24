import PageNavTitle from "../../components/PageNavTitle/PageNavTitle";
import ProductsClient from "./Products.client";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import "./Products.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return {
		title: `${t("products.title")
			.split(" ")
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(" ")} | ${t("company_name")}`,
		description: t("home.desc_seo"),
		alternates: {
			canonical: "https://www.yagodakarpat.com/uk/products",
			languages: {
				uk: "https://www.yagodakarpat.com/uk/products",
				en: "https://www.yagodakarpat.com/en/products",
				"x-default": "https://www.yagodakarpat.com/uk/products",
			},
		},
	};
}

export default async function Products() {
	const t = await getTranslations();

	return (
		<main className="js-products">
			<PageNavTitle homeTitle={t("home_title")} title={t("products_title")} />
			<h1 className="products__title">{t("products.title")}</h1>

			<ProductsClient />
		</main>
	);
}
