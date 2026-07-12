import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import Loading from "@/components/Loading/Loading";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { BASE_URL } from "@/lib/constants";
import Script from "next/script";
import ScrollToTop from "@/utils/ScrollToTop";
import "@/scss/globals.scss";

const montserrat = Montserrat({
	variable: "--font-montserrat",
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

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		// TODO: learn this
		<html lang={locale} suppressHydrationWarning>
			<body className={montserrat.variable}>
				<ScrollToTop />
				<Loading />
				<NextIntlClientProvider locale={locale}>
					<Header products={products} />
					{children}
					<Footer products={products} />
				</NextIntlClientProvider>
				{/* FIXME: */}
				{/* Google */}
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=AW-16930854291"
					strategy="afterInteractive"
				/>
				<Script id="google-ads" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16930854291');
          `}
				</Script>
			</body>
		</html>
	);
}
