import { Product } from "../../interfaces/Product";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageNavTitle from "../../components/PageNavTitle/PageNavTitle";
import ProductCard from "../../components/ProductCard/ProductCard";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import NotFound from "../NotFound/NotFound";
import harvestData from "./../../assets/data/harvest-data.json";
import Container from "../../components/Container/Container";
import classNames from "classnames";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import "./ProductPage.scss";

type ProductPageProps = {
	productsData: Product[];
};

const ProductPage: React.FC<ProductPageProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { id } = useParams();

	const product = productsData.find((product) => product.id === id);

	const [activeVariantId, setActiveVariantId] = useState(
		product?.variants[0].id
	);

	function handleVariantId(props: number) {
		setActiveVariantId(props);
	}

	interface ProductVariant {
		id: number;
		images: string[];
		state?: string;
	}

	// TODO:
	const productVariant: ProductVariant | null =
		product?.variants.find((variant) => variant.id === activeVariantId) ??
		product?.variants[0] ??
		null;

	if (!product || !productVariant) {
		return <NotFound />;
	}

	const relatedProducts = productsData.filter((el) => {
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
	const allImages = product.variants.flatMap((variant) =>
		variant.images ? variant.images : []
	);

	return (
		<>
			<Helmet>
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
				<meta property="og:title" content={t(product.name)} />
				<meta property="og:description" content={t(product.desc)} />
				<meta
					property="og:image"
					content={`https://www.yagodakarpat.com${allImages[0]}`}
				/>
				<meta
					property="og:url"
					content={`https://www.yagodakarpat.com/en/product-page/${id}`}
				/>
				<meta property="og:type" content="product" />
				<meta property="og:site_name" content="Yagoda Karpat" />
				<meta name="description" content={t(product.desc)} />
				<title>{t(product.name) + " / " + t("company_name")}</title>
				<link
					rel="canonical"
					href={`https://www.yagodakarpat.com/uk/product-page/${id}`}
				/>
				<link
					rel="alternate"
					hrefLang="uk"
					href={`https://www.yagodakarpat.com/uk/product-page/${id}`}
				/>
				<link
					rel="alternate"
					hrefLang="en"
					href={`https://www.yagodakarpat.com/en/product-page/${id}`}
				/>
				<link
					rel="alternate"
					hrefLang="x-default"
					href={`https://www.yagodakarpat.com/uk/product-page/${id}`}
				/>
			</Helmet>
			<main>
				<Container>
					<PageNavTitle
						title={product.name}
						previousTitle={t("products_title")}
						homeTitle={t("home_title")}
					/>
					<div className="product-page">
						<div className="product-page__details">
							<div className="product-page__details-inner">
								<div>
									<p className="product-page__lat-name">{product.latName}</p>
									<h1 className="product-page__name">{t(product.name)}</h1>
								</div>
								{product.variants.some((variant) => variant.state) && (
									<div className="product-page__variants">
										{product?.variants.map((variant) => {
											return (
												<button
													key={variant.id}
													onClick={() => handleVariantId(variant.id)}
													className={classNames("variant-btn", {
														"variant-btn--active":
															variant.id === activeVariantId,
													})}
												>
													{t(variant.state!)}
												</button>
											);
										})}
									</div>
								)}
								<div>
									<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
										{t("product_page.origin_title")}
									</h2>
									<p>{t(product.origin)}</p>
								</div>
								<div>
									<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
										{t("product_page.packaging_title")}
									</h2>
									{product.pack.map((option, index) => (
										<p key={index}>{t(option)}</p>
									))}
								</div>
								<div>
									<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
										{t("product_page.desc_title")}
									</h2>
									<p style={{ textAlign: "justify" }}>
										{product.desc && t(product.desc)}
									</p>
								</div>
								<div>
									<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
										{t("harvest_calendar")}
									</h2>
									<div style={{ display: "flex", columnGap: 5 }}>
										{harvestData.map(({ id, month }) => {
											return (
												<div
													key={id}
													title={t(month)}
													className={classNames("harvest-month", {
														"month--active": product.harvest.includes(id),
													})}
												>
													{t(month)[0]}
												</div>
											);
										})}
									</div>
								</div>
							</div>
							<a href="tel:+380968065513" className="product-page__link">
								{t("product_page.aviability_link")}
							</a>
						</div>
						<div className="swiper-wrapper">
							{productVariant.images && (
								<Swiper
									// TODO: LEARN THIS
									key={activeVariantId}
									spaceBetween={25}
									autoplay={{
										delay: 3000,
										disableOnInteraction: false,
									}}
									speed={500}
									loop={true}
									pagination={{
										type: "fraction",
									}}
									modules={[Autoplay, Pagination]}
									className="swiper"
								>
									{productVariant.images.map((img, index) => {
										return (
											<SwiperSlide key={index}>
												<img
													className="swiper-img"
													src={img}
													alt={`${t(product.name)} ${t(
														productVariant.state ?? ""
													)}`.trimEnd()}
												/>
											</SwiperSlide>
										);
									})}
								</Swiper>
							)}
						</div>
					</div>
					<div className="product-page__contacts">
						<div>
							<ContactForm />
						</div>
						<div>
							<ContactDetails />
						</div>
					</div>
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
};

export default ProductPage;
