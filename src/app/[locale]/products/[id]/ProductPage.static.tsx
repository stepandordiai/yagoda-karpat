"use client";

import { useTranslations } from "next-intl";
import { Product } from "@/app/interfaces/Product";
import { JSX, useState, useLayoutEffect } from "react";
import ContactDetails from "@/app/components/ContactDetails/ContactDetails";
import Image from "next/image";
import harvestData from "@/lib/data/harvest-data.json";
import LinkIcon from "@/app/components/LinkIcon/LinkIcon";
import classNames from "classnames";
import WhatsappIcon from "@/app/icons/WhatsappIcon";
import ViberIcon from "@/app/icons/ViberIcon";
import TelIcon from "@/app/icons/TelIcon";
import EmailIcon from "@/app/icons/EmailIcon";
import "./ProductPage.scss";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Harvest {
	id: number;
	month: string;
}

type ProductPageStaticProps = {
	product: Product;
};

interface Social {
	title: string;
	url: string;
	// TODO: LEARN THIS
	img: JSX.Element;
}

const socialsData: Social[] = [
	{
		title: "Email",
		url: "mailto:info@yagodakarpat.com",
		img: <EmailIcon size={24} />,
	},
	{
		title: "Phone number",
		url: "tel:+420722001016",
		img: <TelIcon size={24} />,
	},
	{
		title: "Viber",
		url: "viber://chat?number=+420722001016",
		img: <ViberIcon size={24} />,
	},
	{
		title: "Whatsapp",
		url: "https://wa.me/420722001016",
		img: <WhatsappIcon size={24} />,
	},
];

export default function ProductPageStatic({ product }: ProductPageStaticProps) {
	const t = useTranslations();

	// TODO: LEARN THIS
	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	}, []);

	const [activeVariantId, setActiveVariantId] = useState(
		product?.variants[0].id ?? null,
	);

	function handleVariantId(props: number) {
		setActiveVariantId(props);
	}

	interface ProductVariant {
		id: number;
		images: string[];
		state?: string;
	}

	const productVariant: ProductVariant | null =
		product?.variants.find((variant) => variant.id === activeVariantId) ??
		product?.variants[0] ??
		null;

	return (
		<>
			<div className="product-page">
				<div className="product-page__details">
					<div className="product-page__details-inner">
						<div>
							<p className="product-page__lat-name">{product.latName}</p>
							<h1 className="product-page__name">{t(product.name)}</h1>
						</div>
						{product.variants.some((variant) => variant.state) && (
							<div>
								<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
									{t("product_page.status")}
								</h2>
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
							</div>
						)}
						<div>
							<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
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
							<p>
								<span style={{ fontWeight: 500 }}>
									{t("product_page.origin.region.title")}:
								</span>{" "}
								{t("product_page.origin.region.desc")}
							</p>
							<p>
								<span style={{ fontWeight: 500 }}>
									{t("product_page.origin.traceability.title")}:
								</span>{" "}
								{t("product_page.origin.traceability.desc")}
							</p>
						</div>
						<div>
							<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
								{t("product_page.packaging_title")}
							</h2>
							{product.packaging.paperBag && (
								<p>
									<span style={{ fontWeight: 500 }}>
										{t(product.packaging.paperBag.title)}:
									</span>{" "}
									{t(product.packaging.paperBag.desc)}
								</p>
							)}
							{product.packaging.cartonBox && (
								<p>
									<span style={{ fontWeight: 500 }}>
										{t(product.packaging.cartonBox.title)}:
									</span>{" "}
									{t(product.packaging.cartonBox.desc)}
								</p>
							)}
							{product.packaging.octabin && (
								<p>
									<span style={{ fontWeight: 500 }}>
										{t(product.packaging.octabin.title)}:
									</span>{" "}
									{t(product.packaging.octabin.desc)}
								</p>
							)}
						</div>
						<div>
							<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
								{t("product_page.delivery")}
							</h2>
							<p>{t("product_page.deliveryByVehicle")}</p>
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
					<a className="product-page__link" href="#products-page__contacts">
						{t("requestPrice")}
					</a>
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
												productVariant.state ?? "",
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
			<div className="product-page-section">
				<h3>Your personal sales manager</h3>
				<p style={{ marginBottom: 10 }}>
					Take a look at the product list above and let me know which items
					you’re interested in and the quantities. I’ll prepare a personalized
					offer for you.
				</p>
				<div style={{ display: "flex", gap: 5 }}>
					<div className="product-page-pic">
						<Image
							src="/sales-manager.jpg"
							width={128}
							height={128}
							alt="Picture of the sales manager"
						/>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							flexDirection: "column",
							gap: 5,
						}}
					>
						<div>
							<p>Stepan Dordiai</p>
							<p>Sales Manager</p>
						</div>
						<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
							{socialsData.map(({ title, url, img }, i) => {
								return <LinkIcon key={i} url={url} title={title} icon={img} />;
							})}
						</div>
					</div>
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
									productVariant.state
										? "(" + t(productVariant.state) + ")"
										: ""
								}`.trimEnd()}
								readOnly
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
