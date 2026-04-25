import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ProductsClient from "./Products.client";
import Faq from "@/components/Faq/Faq";
import "./Products.scss";

const productsFaqs = [
	{
		q: "faq.products.q.1",
		a: "faq.products.a.1",
	},
	{
		q: "faq.products.q.2",
		a: "faq.products.a.2",
	},
	{
		q: "faq.products.q.3",
		a: "faq.products.a.3",
	},
	{
		q: "faq.products.q.4",
		a: "faq.products.a.4",
	},
	{
		q: "faq.products.q.5",
		a: "faq.products.a.5",
	},
	{
		q: "faq.products.q.6",
		a: "faq.products.a.6",
	},
];

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "products.meta" });
	const page = "products";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: t("title"),
		description: t("description"),
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
			<Faq faqs={productsFaqs} />
		</main>
	);
}
