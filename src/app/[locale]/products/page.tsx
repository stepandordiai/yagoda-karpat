import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ProductsClient from "./Products.client";
import "./Products.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const page = "products";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: `${t("products.meta.title")} | ${t("company_name")}`,
		description: t("products.meta.description"),
		alternates: {
			canonical: `/${locale}/${page}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}`,
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
