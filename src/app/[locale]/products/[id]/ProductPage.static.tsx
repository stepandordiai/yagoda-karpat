"use client";

import { useTranslations } from "next-intl";
import { Product } from "@/interfaces/Product";
import { JSX, useEffect, useState } from "react";
import ContactDetails from "@/components/ContactDetails/ContactDetails";
import Image from "next/image";
import harvestData from "@/data/harvest-data.json";
import LinkIcon from "@/components/LinkIcon/LinkIcon";
import classNames from "classnames";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import ViberIcon from "@/components/icons/ViberIcon";
import TelIcon from "@/components/icons/TelIcon";
import EmailIcon from "@/components/icons/EmailIcon";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import SearchIcon from "@/components/icons/SearchIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import { supabase } from "@/lib/supabase";
import ContactForm from "@/components/ContactForm/ContactForm";

interface Harvest {
	id: number;
	month: string;
}

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

type ProductPageStaticProps = {
	product: Product;
};

export default function ProductPageStatic({ product }: ProductPageStaticProps) {
	const t = useTranslations();

	const [activeVariantId, setActiveVariantId] = useState(
		product?.variants[0].id ?? null,
	);

	function handleVariantId(props: number) {
		setThumbsSwiper(null);
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

	const [swiperInstance, setSwiperInstance] = useState<any>(null);
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);

	const showFullScreenImg = () => {
		if (!swiperInstance) return;

		setFullScreenIndex(swiperInstance.activeIndex);
	};

	const closeModal = () => {
		setFullScreenIndex(null);
	};

	const showPrevImg = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		setFullScreenIndex((prev) => {
			if (prev === null) return prev;
			return prev === 0 ? productVariant.images.length - 1 : prev - 1;
		});
	};

	const showNextImg = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		setFullScreenIndex((prev) => {
			if (prev === null) return prev;
			return prev === productVariant.images.length - 1 ? 0 : prev + 1;
		});
	};

	useEffect(() => {
		if (fullScreenIndex !== null) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}

		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [fullScreenIndex]);

	// const initForm = {
	// 	name: "",
	// 	company: "",
	// 	email: "",
	// 	requested_product: ,
	// 	message: "",
	// };

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	// const [form, setForm] = useState(initForm);

	// const createContactsLead = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	setError(null);
	// 	setLoading(true);

	// 	const { error } = await supabase.from("clients").insert([form]);
	// 	if (error) {
	// 		console.error("Insert error:", error.message);
	// 		setError(error.message);
	// 		setLoading(false);
	// 	} else {
	// 		setSuccess(true);
	// 		setForm(initForm);
	// 		setLoading(false);
	// 	}
	// };

	// const handleForm = (name: string, value: string) => {
	// 	setForm((prev) => ({ ...prev, [name]: value }));
	// };

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
												className={classNames("variant-btn btn--bold", {
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
							{product.packaging.woodenContainer && (
								<p>
									<span style={{ fontWeight: 500 }}>
										{t(product.packaging.woodenContainer.title)}:
									</span>{" "}
									{t(product.packaging.woodenContainer.desc)}
								</p>
							)}
						</div>
						<div>
							<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
								{t("product_page.delivery.title")}
							</h2>
							<ul>
								<li>
									<span style={{ fontWeight: 500 }}>
										{t("product_page.delivery.refrigeratedTransport.title")}:
									</span>{" "}
									{t(
										`product_page.delivery.refrigeratedTransport.desc.${product.status}`,
									)}
								</li>
								<li>
									<span style={{ fontWeight: 500 }}>
										{t("product_page.delivery.internationalLogistics.title")}:
									</span>{" "}
									{t("product_page.delivery.internationalLogistics.desc")}
								</li>
								<li>
									<span style={{ fontWeight: 500 }}>
										{t("product_page.delivery.deliveryTerms.title")}{" "}
										(Incoterms):
									</span>{" "}
									{t("product_page.delivery.deliveryTerms.desc")}
								</li>
								<li>
									<span style={{ fontWeight: 500 }}>
										{t("product_page.delivery.exportDocumentation.title")}:
									</span>{" "}
									{t("product_page.delivery.exportDocumentation.desc")}
								</li>
							</ul>
						</div>
						{product.desc && (
							<div>
								<h2 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
									{t("product_page.desc_title")}
								</h2>
								{t.raw(product.desc).map((d: string, index: number) => {
									return <p key={index}>{d}</p>;
								})}
								{product.benefits && (
									<>
										<h3 style={{ fontWeight: 500 }}>Key Benefits:</h3>
										<ul>
											{t.raw(product.benefits).map((b: string, i: number) => {
												return (
													<li
														key={i}
														style={{
															listStyle: "disc",
															listStylePosition: "inside",
														}}
													>
														{b}
													</li>
												);
											})}
										</ul>
									</>
								)}
							</div>
						)}
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
						className="product-page__link btn--bold"
						href="#products-page__contacts"
					>
						{t("requestPrice")}
					</a>
				</div>
				<div className="swipers-container">
					<div className="swiper-wrapper">
						<button onClick={showFullScreenImg} className="swiper-wrapper__btn">
							<SearchIcon />
						</button>

						{productVariant.images && (
							<Swiper
								// TODO: learn this
								key={activeVariantId}
								onSwiper={setSwiperInstance}
								breakpoints={{
									900: {
										spaceBetween: 25,
									},
								}}
								spaceBetween={10}
								navigation={
									productVariant.images.length > 1
										? {
												nextEl: ".swiper-btn-next",
												prevEl: ".swiper-btn-prev",
											}
										: false
								}
								// autoplay={{
								// 	delay: 3000,
								// 	disableOnInteraction: false,
								// }}
								// speed={500}
								// loop={productVariant.images.length > 1}
								pagination={
									productVariant.images.length > 1
										? {
												type: "fraction",
											}
										: false
								}
								// TODO: learn this
								thumbs={{
									swiper:
										thumbsSwiper && !thumbsSwiper.destroyed
											? thumbsSwiper
											: null,
								}}
								modules={[Pagination, Navigation, FreeMode, Thumbs]}
								className="swiper"
							>
								{productVariant.images.length > 1 && (
									<>
										<button className="swiper-btn-prev">
											<ChevronLeftIcon />
										</button>
										<button className="swiper-btn-next">
											<ChevronRightIcon />
										</button>
									</>
								)}
								{productVariant.images.map((img, index) => {
									return (
										<SwiperSlide key={index}>
											<Image
												className="swiper-img"
												src={img}
												width={1600}
												height={1200}
												alt={`${t(product.name)} ${productVariant.state ? t(productVariant.state) : ""}`.trimEnd()}
												// TODO: learn this
												priority={index === 0}
											/>
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</div>
					<div>
						<Swiper
							// TODO: learn this
							key={`thumbs-${activeVariantId}`}
							onSwiper={setThumbsSwiper}
							spaceBetween={10}
							slidesPerView={4}
							// TODO: ?
							freeMode={true}
							watchSlidesProgress={true}
							modules={[FreeMode, Navigation, Thumbs]}
							className="swiper-thumbs"
						>
							{productVariant.images.map((img, index) => {
								return (
									<SwiperSlide key={index}>
										<Image
											className="swiper-img"
											src={img}
											width={1600}
											height={1200}
											alt={`${t(product.name)} ${productVariant.state ? t(productVariant.state) : ""}`.trimEnd()}
										/>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
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
			<div className="product-page__contacts">
				<ContactForm
					heading={t("product_page.requestQuotation")}
					requestedProduct={`${t(product.name)} ${
						productVariant.state ? "(" + t(productVariant.state) + ")" : ""
					}`.trimEnd()}
				/>
				<ContactDetails />
			</div>
			{fullScreenIndex !== null && (
				<div className="img-modal" onClick={closeModal}>
					<button
						type="button"
						className="img-modal__close"
						onClick={closeModal}
					>
						<CloseIcon size={24} />
					</button>

					<Image
						src={productVariant.images[fullScreenIndex]}
						width={1600}
						height={1200}
						alt="Full screen image"
						className="img-modal__img"
						onClick={(e) => e.stopPropagation()}
					/>

					{productVariant.images.length > 1 && (
						<>
							<div
								className="img-modal__nav"
								onClick={(e) => e.stopPropagation()}
							>
								<button
									className="img-modal__prev"
									type="button"
									onClick={showPrevImg}
								>
									<ChevronLeftIcon size={24} />
								</button>
								<button
									className="img-modal__next"
									type="button"
									onClick={showNextImg}
								>
									<ChevronRightIcon size={24} />
								</button>
							</div>
							<div className="img-modal__pag">
								{fullScreenIndex + 1}/{productVariant.images.length}
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
