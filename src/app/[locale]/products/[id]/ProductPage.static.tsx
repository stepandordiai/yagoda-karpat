"use client";

import { useState } from "react";
import PageNavTitle from "@/app/components/PageNavTitle/PageNavTitle";
import ContactDetails from "@/app/components/ContactDetails/ContactDetails";
import classNames from "classnames";
import Image from "next/image";
import harvestData from "@/lib/data/harvest-data.json";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import "./ProductPage.scss";
import { useTranslations } from "next-intl";
import { Product } from "@/app/interfaces/Product";

interface Harvest {
	id: number;
	month: string;
}

type ProductPageStaticProps = {
	product: Product;
	id: string;
};

export default function ProductPageStatic({
	product,
	id,
}: ProductPageStaticProps) {
	const t = useTranslations();

	const [activeVariantId, setActiveVariantId] = useState(
		product?.variants[0].id ?? null
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

	return (
		<>
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
												"variant-btn--active": variant.id === activeVariantId,
											})}
										>
											{t(variant.state!)}
										</button>
									);
								})}
							</div>
						)}
						<div>
							<h2 style={{ color: "hsl(0, 0%, 50%)" }}>
								{t("certificates_title")}
							</h2>
							<div style={{ display: "flex", columnGap: 5 }}>
								{product.isOrganic && (
									<img
										src="/icons/organic-logo.jpg"
										alt="Organic Standard logo"
										loading="lazy"
									/>
								)}
								<span>HACCP</span>
							</div>
						</div>
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
								{harvestData.map(({ id, month }: Harvest) => {
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
					<a
						className="product-page__link"
						// Додаємо / перед #
						href="#products-page__contacts"
					>
						{t("requestPrice")}
					</a>
					{/* <Link
						href={`/products/${id}/#products-page__contacts`}
						className="product-page__link"
					>
						{t("requestPrice")}
					</Link> */}
				</div>
				<div className="swiper-wrapper">
					{productVariant.images && (
						<Swiper
							// TODO: learn this
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
										<Image
											className="swiper-img"
											src={img}
											width={1600}
											height={1200}
											alt={`${t(product.name)} ${t(
												productVariant.state ?? ""
											)}`.trimEnd()}
											// TODO: LEARN THIS
											priority={index === 0}
										/>
									</SwiperSlide>
								);
							})}
						</Swiper>
					)}
				</div>
			</div>
			<h3 className="product-page-form__title" id="products-page__contacts">
				{t("product_page.requestQuotation")}
			</h3>
			<div className="product-page__contacts">
				<div>
					<form
						className="product-page-form"
						action="https://formsubmit.co/info@yagodakarpat.com"
						method="POST"
					>
						<div className="input-container">
							<label className="contact-label" htmlFor="name">
								{t("contacts.name")}
							</label>
							<input
								className="form__input"
								id="name"
								name="name"
								autoComplete="name"
								type="text"
								required
							/>
						</div>
						<div className="input-container">
							<label className="contact-label" htmlFor="company">
								{t("product_page.company")}
							</label>
							<input
								className="form__input"
								id="company"
								name="company"
								type="text"
								required
							/>
						</div>
						<div className="input-container">
							<label className="contact-label" htmlFor="email">
								{t("contacts.email")}
							</label>
							<input
								className="form__input"
								id="email"
								name="email"
								autoComplete="email"
								type="email"
								required
							/>
						</div>
						<div className="input-container">
							<label className="contact-label" htmlFor="product">
								{t("product_page.productRequested")}
							</label>
							<input
								className="form__input form__input--readonly"
								id="product"
								name="product"
								type="text"
								value={`${t(product.name)} ${
									productVariant.state ? t(productVariant.state) : ""
								}`.trimEnd()}
								readOnly
								// TODO: learn this
								aria-readonly="true"
							/>
						</div>
						<div className="input-container textarea-container">
							<label className="contact-label" htmlFor="message">
								{t("contacts.message")}
							</label>
							<textarea
								rows={3}
								name="message"
								id="message"
								placeholder={t("product_page.messagePlaceholder")}
							></textarea>
						</div>
						<div>
							<button className="form-submit-btn" type="submit">
								{t("requestPrice")}
							</button>
							<p style={{ marginTop: 10 }}>
								{t("product_page.minimumOrderQuantity")}
							</p>
						</div>
					</form>
				</div>
				<div>
					<ContactDetails />
				</div>
			</div>
		</>
	);
}
