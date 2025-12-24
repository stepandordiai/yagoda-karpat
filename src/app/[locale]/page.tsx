import { Product } from "../interfaces/Product";
// import { getTranslations } from "next-intl/server";
import { getTranslations } from "next-intl/server";
// import { getTranslations } from "next-intl";
// import HomeClient from "./Home.client";
import type { Metadata } from "next";
import HomeClient from "./Home.client";
import productsData from "@/lib/data/products-data.json";
import "./Home.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return {
		title: `${t("home.title")} | ${t("company_name")}`,
		description: t("home.desc_seo"),
		alternates: {
			canonical: "https://www.yagodakarpat.com/uk/",
			languages: {
				uk: "https://www.yagodakarpat.com/uk/",
				en: "https://www.yagodakarpat.com/en/",
				"x-default": "https://www.yagodakarpat.com/uk/",
			},
		},
	};
}

const productsDataTyped = productsData as Product[];

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
	const { locale } = await params;

	return <HomeClient productsData={productsDataTyped} locale={locale} />;
}
