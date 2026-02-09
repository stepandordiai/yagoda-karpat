import { getTranslations } from "next-intl/server";
import Container from "@/app/components/Container/Container";
import { notFound } from "next/navigation";
import productsData from "@/lib/data/products-data.json";
import ProductPageStatic from "./ProductPage.static";
import type { Metadata } from "next";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { Product } from "@/app/interfaces/Product";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import "./ProductPage.scss";

const products = productsData as Product[];

function getProductsData() {
	return productsData as Product[];
}

// TODO: learn this
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id, locale } = await params;
	const product = products.find((p) => p.id === id);
	const t = await getTranslations({ locale });
	const baseUrl = "https://www.yagodakarpat.com";

	return {
		title: `${t(product!.name)
			.split(" ")
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")} | ${t("product_page.wholesaleSupplier")} | ${t(
			"company_name",
		)}`,
		description: t(product!.desc),
		alternates: {
			canonical: `${baseUrl}/${locale}/${product!.id}`,
			languages: {
				uk: `${baseUrl}/uk/${product!.id}`,
				en: `${baseUrl}/en/${product!.id}`,
				cs: `${baseUrl}/cs/${product!.id}`,
				"x-default": `${baseUrl}/uk/${product!.id}`,
			},
		},
	};
}

// TODO: LEARN THIS
export async function generateStaticParams() {
	const products = getProductsData();
	const locales = ["en", "uk", "cs"]; // Add your supported locales

	return locales.flatMap((locale) =>
		products.map((product) => ({
			locale,
			id: String(product.id),
		})),
	);
}

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;

	const t = await getTranslations();

	const product = products.find((product) => product.id === id);

	if (!product) {
		notFound();
	}

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
	);
}
