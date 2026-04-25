import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import products from "@//data/products.json";
import Loading from "@/components/Loading/Loading";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { BASE_URL } from "@/lib/constants";
import "@/scss/globals.scss";
import ScrollToTop from "@/utils/ScrollToTop";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	weight: ["300", "400", "500", "700"],
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
};

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params;

	const t = await getTranslations({ locale });

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: t("company_name"),
		url: `https://www.yagodakarpat.com/${locale}`,
		description: t("home.title"),
	};

	return (
		<html lang={locale}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={montserrat.variable}>
				<ScrollToTop />
				<NextIntlClientProvider locale={locale}>
					<Loading />
					<Header products={products} />
					{children}
					<Footer products={products} />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
