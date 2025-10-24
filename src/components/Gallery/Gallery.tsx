import { useTranslation } from "react-i18next";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import "./Gallery.scss";

interface GalleryDataTypes {
	img: string;
	date: string;
}

const galleryData: Required<GalleryDataTypes[]> = [
	{ img: "/gallery/01-c.jpg", date: "26/11/24" },
	{ img: "/gallery/02-c.jpg", date: "8/7/24" },
];

const Gallery = () => {
	const { t } = useTranslation();

	return (
		<div className="gallery">
			<h2 className="gallery__title">{t("gallery_title")}</h2>
			<Swiper
				breakpoints={{
					900: {
						slidesPerView: 4,
						spaceBetween: 25,
					},
				}}
				spaceBetween={10}
				slidesPerView={2}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				speed={1000}
				loop={true}
				modules={[Autoplay]}
				className="mySwiper"
			>
				{galleryData.map(({ img, date }, index) => {
					return (
						<SwiperSlide key={index} className="swiper-card" data-date={date}>
							<img src={img} alt="" loading="lazy" />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Gallery;
