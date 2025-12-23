import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// import "./../scss/globals.scss";
import "./../scss/globals.scss";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Header from "../components/Header/Header";
import productsData from "./../assets/data/products-data.json";
import { Product } from "../interfaces/Product";
import Footer from "../components/Footer/Footer";

const montserrat = Montserrat({
	subsets: ["latin", "cyrillic"], // Обов'язково додаємо cyrillic для української мови
	weight: ["300", "400", "500", "700"], // Оберіть потрібну товщину
	variable: "--font-montserrat", // Створюємо CSS-змінну
});

export const metadata: Metadata = {
	title: "Pixelflower Studio | Цифрові запрошення",
	description: "Створюємо унікальні міні-сайти для ваших подій",
};

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

	const productsDataTyped = productsData as Product[];

	return (
		<html>
			<body className={montserrat.className}>
				{/* 3. Обов'язково передаємо messages у провайдер */}
				<NextIntlClientProvider>
					<Header productsData={productsDataTyped} />
					{children}
					<Footer productsData={productsDataTyped} />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
