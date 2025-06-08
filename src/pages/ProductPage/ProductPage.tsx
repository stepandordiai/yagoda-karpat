import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageNavTitle from "../../components/PageNavTitle/PageNavTitle";
import Product from "../../components/Product/Product";
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";

// Swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import "./ProductPage.scss";

interface ProductsData {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string;
	desc: string;
	variants: {
		id: string;
		images?: string[];
		state?: string;
	}[];
	isOrganic?: boolean;
	harvest: number[];
}

interface ProductPageProps {
	productsData: ProductsData[];
}

const ProductPage: React.FC<ProductPageProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { id } = useParams();

	const productData = productsData.find((product) => product.id === id);

	const [activeVariantId, setActiveVariantId] = useState(
		productData?.variants[0].id
	);

	function handleVariantId(props: string) {
		if (!props) return;
		setActiveVariantId(props);
	}

	useEffect(() => {
		if (activeVariantId) {
			setActiveVariantId(productData?.variants[0].id);
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
		productData?.variants.find((variant) => variant.id === activeVariantId) ??
		productData?.variants[0] ??
		null;

	if (!productData || !productVariant) return;

	const relatedProducts = productsData.filter((product) => {
		return (
			product.status === productData.status &&
			product.type === productData.type &&
			product.name !== productData.name
		);
	});

	console.log(relatedProducts);

	return (
		<>
			<Helmet>
				<title>{t(productData.name) + "/" + t("company_name")}</title>
				<link rel="canonical" href={`https://yagodakarpat.com/${id}`} />
			</Helmet>
			<main>
				<PageNavTitle
					title={productData.name}
					previousTitle={t("products_title")}
					homeTitle={t("home_title")}
				/>
				<div className="product-page">
					<div className="product-page__details">
						<div className="product-page__details-inner">
							<div>
								<p className="product-page__lat-name">{productData.latName}</p>
								<p className="product-page__name">{`${t(productData.name)} 
								${productVariant.state ? t(productVariant.state) : ""}
							`}</p>
							</div>
							<div className="product-page__variants">
								{productData.variants &&
									productData.variants.map((variant, index) => {
										if (variant.state) {
											return (
												<button
													key={index}
													onClick={() => handleVariantId(variant.id)}
													className={
														variant.id === activeVariantId
															? "variant-btn variant-btn--active"
															: "variant-btn"
													}
												>
													{t(variant.state)}
												</button>
											);
										}
									})}
							</div>
							<div>
								<p style={{ color: "hsl(0, 0%, 50%)" }}>
									{t("product_page.origin_title")}
								</p>
								<p>{productData.origin}</p>
							</div>
							<div>
								<p style={{ color: "hsl(0, 0%, 50%)" }}>
									{t("product_page.packaging_title")}
								</p>
								<p>{productData.pack}</p>
							</div>
							<div>
								<p style={{ color: "hsl(0, 0%, 50%)" }}>
									{t("product_page.desc_title")}
								</p>
								<p>{productData.desc && productData.desc}</p>
							</div>
						</div>
						<HashLink smooth to={"/#contacts"} className={"product-page__link"}>
							{t("product_page.aviability_link")}
						</HashLink>
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
			</main>
		</>
	);
};

export default ProductPage;
