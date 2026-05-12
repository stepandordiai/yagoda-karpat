import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import products from "@/data/products.json";
import AboutUs from "@/components/home/AboutUs/AboutUs";
import Contacts from "@/components/home/Contacts/Contacts";
import Container from "@/components/Container/Container";
import ProductCard from "@/components/ProductCard/ProductCard";
import Certificates from "@/components/home/Certificates/Certificates";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/home/Hero/Hero";
import Faqs from "@/components/Faqs/Faqs";
import "./Home.scss";

type Faq = {
	q: string;
	a: string;
};

const faqs: Faq[] = [
	{
		q: "faq.home.q.1",
		a: "faq.home.a.1",
	},
	{
		q: "faq.home.q.2",
		a: "faq.home.a.2",
	},
	{
		q: "faq.home.q.3",
		a: "faq.home.a.3",
	},
	{
		q: "faq.home.q.4",
		a: "faq.home.a.4",
	},
	{
		q: "faq.home.q.5",
		a: "faq.home.a.5",
	},
	{
		q: "faq.home.q.6",
		a: "faq.home.a.6",
	},
];

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home.meta" });
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}`]),
	);

	return {
		title: t("title"),
		description: t("description"),
		alternates: {
			canonical: `/${locale}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}`,
			},
		},
	};
}

export default async function Home() {
	const t = await getTranslations();

	return (
		<main>
			<Container>
				<Hero />
				<AboutUs productsLength={products.length} />
				<section className="home-products" id="products">
					<h2 className="section-title">{t("products_title")}</h2>
					<div className="products-container">
						{products
							.filter((product) => product.isFeatured)
							.map((product) => {
								return <ProductCard key={product.id} product={product} />;
							})}
					</div>
					<Link className="home-products__link btn--bold" href="/products">
						{t("home.viewAllProducts")}
					</Link>
				</section>
				<Certificates />
				<Faqs faqs={faqs} />
				<Contacts />
			</Container>
		</main>
	);
}
