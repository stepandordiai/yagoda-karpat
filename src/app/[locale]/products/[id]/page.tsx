import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import ProductPageStatic from "./ProductPage.static";
import ProductCard from "@/components/ProductCard/ProductCard";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { productJsonLd } from "@/lib/jsonld/ProductJsonLd";
import "./ProductPage.scss";

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

	return {
		title: `${t(product.name)} | ${t("product_page.meta.title")}`,
		description: `${t(product.name)} ${t("product_page.meta.description")}`,
		alternates: {
			canonical: `/${locale}/${prevPage}/${product.id}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${prevPage}/${product.id}`,
			},
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

	const t = await getTranslations();

	const product = products.find((product) => product.id === id);

	if (!product) {
		return notFound();
	}

	const jsonLd = productJsonLd({
		product,
		locale,
		localizedName: t(product.name),
		localizedDesc: t(product.desc),
		localizedCategory: t(product.type),
	});

	const relatedProducts = products.filter((el) => {
		return (
			el.status === product.status &&
			el.type === product.type &&
			el.name !== product.name
		);
	});

	// TODO:
	// function truncateForSEO(str: string, maxLength: number = 160) {
	// 	if (str.length <= maxLength) return str;
	// 	const trimmed = str.slice(0, maxLength);
	// 	const lastSpace = trimmed.lastIndexOf(" ");
	// 	return trimmed.slice(0, lastSpace);
	// }

	// FIXME:
	// const allImages = product.variants.flatMap((variant) =>
	// 	variant.images ? variant.images : []
	// );

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			></script>
			<main>
				<Container>
					<Breadcrumbs
						title={t(product.name)}
						previousTitle={t("products_title")}
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
				</Container>
			</main>
		</>
	);
}
