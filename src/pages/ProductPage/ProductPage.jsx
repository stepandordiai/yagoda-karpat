import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import PageNavTitle from "../../components/PageNavTitle/PageNavTitle";
import ProductsData from "../../data/productsData";
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

const ProductPage = () => {
	const { t } = useTranslation();

	const { id } = useParams();

	const productsData = ProductsData();

	const productData = productsData.find((product) => product.id === id);

	const [activeVariantId, setActiveVariantId] = useState(
		productData.variants[0].id
	);

	function handleVariantId(props) {
		if (props) {
			setActiveVariantId(props);
		}
	}

	useEffect(() => {
		if (activeVariantId) {
			setActiveVariantId(productData.variants[0].id);
		}
	}, [id]);

	// I find value or  and omit undefinded
	// TODO:
	const productVariant =
		productData.variants.find((variant) => variant.id === activeVariantId) ??
		productData.variants[0] ??
		null;

	return (
		<>
			<Helmet>
				<title>{productData.name} / Ягода Карпат</title>
				<link
					rel="canonical"
					href={`https://yagodakarpat.com/product-page/${id}`}
				/>
			</Helmet>
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
							<p className="product-page__name">{`${productData.name} 
								${productVariant.state ? productVariant.state : ""}
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
												{variant.state}
											</button>
										);
									}
								})}
						</div>
						<div>
							<p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
								{t("product_page.origin_title")}
							</p>
							<p>{productData.origin}</p>
						</div>
						<div>
							<p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
								{t("product_page.packaging_title")}
							</p>
							<p>{productData.pack}</p>
						</div>
						<div>
							<p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
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
			<p className="related-products__title">{t("product_page.related")}</p>
			{productsData
				.filter((product) => {
					return (
						product.status === productData.status &&
						product.type === productData.type &&
						product.name !== productData.name
					);
				})
				.map((product) => {
					return <Product product={product} key={product.id} />;
				})}
		</>
	);
};

export default ProductPage;
