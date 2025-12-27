import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import productsData from "@/lib/data/products-data.json";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./../scss/globals.scss";

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

const montserrat = Montserrat({
	subsets: ["latin", "cyrillic"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-montserrat",
});

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
	children,
	params,
}: RootLayoutProps) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className={montserrat.className}>
				<NextIntlClientProvider>
					{/* TODO: */}
					<Loading />
					<Header productsData={productsData} />
					{children}
					<Footer productsData={productsData} />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
