import Container from "@/app/components/Container/Container";
import { notFound } from "next/navigation";
import productsData from "./../../../assets/data/products-data.json";
import ProductPageStatic from "./ProductPage.static";
import "./ProductPage.scss";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

// TODO: LEARN THIS
export async function generateStaticParams(): Promise<{ id: string }[]> {
	const productData = productsData;
	return productData.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const products = productsData;
	const product = products.find((p) => p.id === id);
	const t = await getTranslations();

	return {
		title: `${t(product!.name)
			.split(" ")
			.map((word: string) => word[0].toUpperCase() + word.slice(1))
			.join(" ")} | ${t("product_page.wholesaleSupplier")} | ${t(
			"company_name"
		)}`,
		description: t(product!.desc),
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;

	const product = productsData.find((product) => product.id === id);

	if (!product) {
		notFound();
	}

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
				</Container>
			</main>
		</>
	);
}
