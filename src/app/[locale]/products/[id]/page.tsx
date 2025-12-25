import Container from "@/app/components/Container/Container";
import { notFound } from "next/navigation";
import productsData from "@/lib/data/products-data.json";
import ProductPageStatic from "./ProductPage.static";
import "./ProductPage.scss";
import type { Metadata } from "next";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { getTranslations } from "next-intl/server";
import { Product } from "@/app/interfaces/Product";

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

const productsDataTyped = productsData as Product[];
function getProductsData() {
	return productsData as Product[];
}

// TODO: LEARN THIS
export async function generateStaticParams() {
	const products = getProductsData();
	const locales = ["en", "uk"]; // Add your supported locales

	return locales.flatMap((locale) =>
		products.map((product) => ({
			locale,
			id: String(product.id),
		}))
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const product = productsDataTyped.find((p) => p.id === id);
	const t = await getTranslations();

	return {
		title: `${t(product!.name)
			.split(" ")
			.map((word: string) => word[0].toUpperCase() + word.slice(1))
			.join(" ")} | ${t("product_page.wholesaleSupplier")} | ${t(
			"company_name"
		)}`,
		description: t(product!.desc),
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;

	const t = await getTranslations();

	const product = productsDataTyped.find(
		(product) => String(product.id) === id
	);

	if (!product) {
		notFound();
	}

	const relatedProducts = productsDataTyped.filter((el) => {
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
			{/* TODO: ld json */}
			{/* <script type="application/ld+json">
					{`
      					{
        					"@context": "https://schema.org",
        					"@type": "Product",
        					"name": "${t(product.name)}",
       						"image": "${allImages[0]}",
        					"description": "${t(product.desc)}"
      					}
    				`}
				</script> */}
			{/* TODO: og */}
			{/* <meta property="og:title" content={t(product.name)} />
				<meta property="og:description" content={t(product.desc)} />
				<meta
					property="og:image"
					content={`https://www.yagodakarpat.com${allImages[0]}`}
				/>
				<meta
					property="og:url"
					content={`https://www.yagodakarpat.com/en/products/${id}`}
				/>
				<meta property="og:type" content="product" />
				<meta property="og:site_name" content="Yagoda Karpat" /> */}

			<main>
				<Container>
					<ProductPageStatic product={product} id={id} />
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
