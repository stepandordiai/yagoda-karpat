import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PageNavTitle from "../../components/PageNavTitle/PageNavTitle";
import Product from "../../components/Product/Product";
import { useEffect, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import ContactForm from "../../components/ContactForm/ContactForm";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import NotFound from "../NotFound/NotFound";
import Container from "../../components/Container/Container";
import "./ProductPage.scss";

interface ProductsData {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string[];
	desc: string;
	variants: {
		id: string;
		images?: string[];
		state?: string;
	}[];
	isOrganic?: boolean;
	harvest: number[];
	descSEO: string;
}

interface ProductPageProps {
	productsData: ProductsData[];
}

const ProductPage: React.FC<ProductPageProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { id } = useParams();

	const product = productsData.find((product) => product.id === id);

	const [activeVariantId, setActiveVariantId] = useState(
		product?.variants[0].id
	);

	function handleVariantId(props: string) {
		if (!props) return;
		setActiveVariantId(props);
	}

	useEffect(() => {
		if (activeVariantId) {
			setActiveVariantId(product?.variants[0].id);
		}
	}, [id]);

	// I find value or and omit undefinded
	// TODO:

	interface ProductVariant {
		id: string;
		images?: string[];
		state?: string;
	}

	const productVariant: ProductVariant | null =
		product?.variants.find((variant) => variant.id === activeVariantId) ??
		product?.variants[0] ??
		null;

	if (!product || !productVariant) {
		return <NotFound />;
	}

	const relatedProducts = productsData.filter((product) => {
		return (
			product.status === product.status &&
			product.type === product.type &&
			product.name !== product.name
		);
	});

	// TODO:
	// function truncateForSEO(str: string, maxLength: number = 160) {
	// 	if (str.length <= maxLength) return str;
	// 	const trimmed = str.slice(0, maxLength);
	// 	const lastSpace = trimmed.lastIndexOf(" ");
	// 	return trimmed.slice(0, lastSpace);
	// }

	return (
		<>
			<Helmet>
				<meta name="description" content={t(product.descSEO)} />
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
													className={
														variant.id === activeVariantId
															? "variant-btn variant-btn--active"
															: "variant-btn"
													}
												>
													{t(variant.state!)}
												</button>
											);
										})}
									</div>
								)}
								<div>
									<span style={{ color: "hsl(0, 0%, 50%)" }}>
										{t("product_page.origin_title")}
									</span>
									<p>{t(product.origin)}</p>
								</div>
								<div>
									<span style={{ color: "hsl(0, 0%, 50%)" }}>
										{t("product_page.packaging_title")}
									</span>
									{product.pack.map((option, index) => (
										<p key={index}>{t(option)}</p>
									))}
								</div>
								<div>
									<span style={{ color: "hsl(0, 0%, 50%)" }}>
										{t("product_page.desc_title")}
									</span>
									<p>{product.desc && t(product.desc)}</p>
								</div>
							</div>
							<a href="tel:+380968065513" className="product-page__link">
								{t("product_page.aviability_link")}
							</a>
						</div>
						<div className="swiper-wrapper">
							{productVariant.images && (
								<>
									<Swiper
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
													<img className="swiper-img" src={img} alt="" />
												</SwiperSlide>
											);
										})}
									</Swiper>
								</>
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
									return <Product product={product} key={product.id} />;
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
