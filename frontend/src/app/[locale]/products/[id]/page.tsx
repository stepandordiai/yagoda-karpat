import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import ProductPageStatic from "./ProductPage.static";
import ProductCard from "@/components/ProductCard/ProductCard";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Faqs from "@/components/Faqs/Faqs";
import "./ProductPage.scss";

const productPageFaqs = [
	{
		q: "faq.productPage.q.1",
		a: "faq.productPage.a.1",
	},
	{
		q: "faq.productPage.q.2",
		a: "faq.productPage.a.2",
	},
	{
		q: "faq.productPage.q.3",
		a: "faq.productPage.a.3",
	},
	{
		q: "faq.productPage.q.4",
		a: "faq.productPage.a.4",
	},
	{
		q: "faq.productPage.q.5",
		a: "faq.productPage.a.5",
	},
	{
		q: "faq.productPage.q.6",
		a: "faq.productPage.a.6",
	},
];

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id, locale } = await params;
	const t = await getTranslations({ locale });
	const product = products.find((p) => p.id === id);
	const prevPage = "products";

	if (!product) {
		return {
			title: "404",
		};
	}

	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${prevPage}/${product.id}`]),
	);

	// TODO: learn this
	const firstImage = product.variants
		.flatMap((v) =>
			"grades" in v && v.grades ? v.grades.flatMap((g) => g.images) : v.images,
		)
		.at(0);

	return {
		title: t(product.metaTitle),
		description: t(product.metaDescription),
		alternates: {
			canonical: `/${locale}/${prevPage}/${product.id}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${prevPage}/${product.id}`,
			},
		},
		// TODO: learn this
		openGraph: {
			title: t(product.metaTitle),
			description: t(product.metaDescription),
			url: `/${locale}/${prevPage}/${product.id}`,
			type: "website",
			images: firstImage,
		},
	};
}

export async function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		products.map((product) => ({
			locale,
			id: product.id,
		})),
	);
}

type ProductPageProps = {
	params: Promise<{ id: string; locale: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { id, locale } = await params;

	const t = await getTranslations({ locale });

	const product = products.find((product) => product.id === id);

	if (!product) {
		return notFound();
	}

	const relatedProducts = products.filter((el) => {
		return (
			el.status === product.status &&
			el.type === product.type &&
			el.name !== product.name
		);
	});

	// const jsonLd = {
	// 	"@context": "https://schema.org",
	// 	"@type": "Product",
	// 	name: t(product.name),
	// 	description: t(product.metaDescription),
	// 	url: `${BASE_URL}/${locale}/products/${product.id}`,
	// 	image: product.variants.flatMap((v) => {
	// 		const grades = "grades" in v ? v.grades : undefined;
	// 		if (grades?.length) {
	// 			return grades.flatMap((g) =>
	// 				(g.images ?? []).map((img) => `${BASE_URL}${img}`),
	// 			);
	// 		}
	// 		return (v.images ?? []).map((img) => `${BASE_URL}${img}`);
	// 	}),
	// 	category: t(product.type),
	// 	alternateName: product.latName,
	// 	brand: { "@id": `${BASE_URL}/#organization` },
	// 	manufacturer: { "@id": `${BASE_URL}/#organization` },
	// 	countryOfOrigin: {
	// 		"@type": "Country",
	// 		name: "Ukraine",
	// 	},
	// 	hasCertification: [
	// 		{
	// 			"@type": "Certification",
	// 			name: "HACCP",
	// 			issuedBy: { "@type": "Organization", name: "HACCP Authority" },
	// 		},
	// 		...(product.isOrganic
	// 			? [
	// 					{
	// 						"@type": "Certification",
	// 						name: "Organic Standard",
	// 						issuedBy: { "@type": "Organization", name: "Organic Standard" },
	// 						url: `${BASE_URL}/pdf/yagoda-karpat-organic-certificate.pdf`,
	// 					},
	// 				]
	// 			: []),
	// 	],
	// 	additionalProperty: [
	// 		{
	// 			"@type": "PropertyValue",
	// 			name: "Minimum Order Quantity",
	// 			value: "500 kg",
	// 		},
	// 		{
	// 			"@type": "PropertyValue",
	// 			name: "Storage Temperature",
	// 			value: "-18°C",
	// 		},
	// 		{
	// 			"@type": "PropertyValue",
	// 			name: "Packaging Options",
	// 			value: "25 kg multi-layer paper bags; 400 kg industrial octabins",
	// 		},
	// 		{
	// 			"@type": "PropertyValue",
	// 			name: "Delivery Terms",
	// 			value: "FCA, DAP, DDP",
	// 		},
	// 	],
	// };

	return (
		<main>
			<Container>
				<Breadcrumbs
					title={t(product.name)}
					previousTitle={t("products_title")}
					previousUrl="/products"
					homeTitle={t("home_title")}
				/>
				<ProductPageStatic product={product} />
				{relatedProducts.length > 0 && (
					<>
						<p className="related-products__title">
							{t("product_page.related")}
						</p>
						<div className="related-products__grid">
							{relatedProducts.map((product) => {
								return <ProductCard product={product} key={product.id} />;
							})}
						</div>
					</>
				)}
				<Faqs faqs={productPageFaqs} />
			</Container>
		</main>
	);
}
