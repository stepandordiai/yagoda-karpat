"use client";

import { useTranslations } from "next-intl";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import "./Gallery.scss";

const gallery = [
	"/gallery/01-c.jpg",
	"/gallery/02-c.jpg",
	"/gallery/03-c.jpeg",
	"/gallery/04-c.jpeg",
];

const Gallery = () => {
	const t = useTranslations();

	return (
		<div className="gallery">
			<h3 className="gallery__title">{t("gallery_title")}</h3>
			<Swiper
				breakpoints={{
					900: {
						slidesPerView: 4,
						spaceBetween: 25,
						loop: false,
					},
					600: {
						slidesPerView: 3,
						spaceBetween: 10,
						loop: true,
					},
					400: {
						slidesPerView: 2,
						spaceBetween: 10,
						loop: true,
					},
				}}
				spaceBetween={10}
				slidesPerView={1}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				speed={1000}
				loop={gallery.length > 1}
				modules={[Autoplay]}
			>
				{gallery.map((src, index) => {
					return (
						<SwiperSlide
							key={index}
							className="swiper-card"
							data-label={t(`gallery.${index}`)}
						>
							<Image
								src={src}
								width={448.75}
								height={598.33}
								alt={t(`gallery.${index}`)}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Gallery;
