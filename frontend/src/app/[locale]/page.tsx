import { type Metadata } from "next";
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
import { BASE_URL } from "@/lib/constants";
import posts from "@/data/posts.json";
import BlogCard from "@/components/BlogCard/BlogCard";
import "./Home.scss";

const faqs = [
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
		// TODO: learn this
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: `/${locale}`,
			type: "website",
			images: "/yagoda-karpat-og.png",
		},
	};
}

export default async function Home() {
	const t = await getTranslations();

	// TODO: learn this
	// Organization
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${BASE_URL}/#organization`,
		name: t("company_name"),
		url: BASE_URL,
		// FIXME:
		logo: `${BASE_URL}/logo-img/yagoda-karpat-logo.svg`,
		image: `${BASE_URL}/yagoda-karpat-og.png`,
		description: t("home.meta.description"),
		email: "info@yagodakarpat.com",
		telephone: "+380968065513",
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+380968065513",
			email: "info@yagodakarpat.com",
			contactType: "sales",
			availableLanguage: ["uk", "en", "cs"],
		},
		sameAs: [
			"https://www.facebook.com/profile.php?id=61584019674019",
			"https://www.linkedin.com/company/yagoda-karpat",
			"https://www.youtube.com/@YagodaKarpat",
		],
		address: {
			"@type": "PostalAddress",
			streetAddress: "Central street, 34B",
			addressLocality: "Vilkhivtsi",
			addressRegion: "Zakarpattia",
			postalCode: "90542",
			addressCountry: "UA",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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
						<Link className="products-section__link btn--bold" href="/products">
							{t("home.viewAllProducts")}
						</Link>
					</section>
					<Certificates />
					<section id="blog">
						<h2 className="section-title">{t("blogSection.heading")}</h2>
						<p style={{ marginBottom: "10px" }}>
							{t("blogSection.subheading")}
						</p>
						<div className="posts-grid">
							{posts.map((p) => {
								return <BlogCard key={p.slug} post={p} />;
							})}
						</div>
						<Link className="blog-section__link" href="/blog">
							{t("blogSection.viewAll")}
						</Link>
					</section>
					<Faqs faqs={faqs} />
					<Contacts />
				</Container>
			</main>
		</>
	);
}
