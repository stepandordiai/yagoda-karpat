import { useTranslation } from "react-i18next";

// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import required modules
// import { Autoplay } from "swiper/modules";
import "./Gallery.scss";

const Gallery = () => {
	const { t } = useTranslation();

	// interface GalleryDataTypes {
	// 	img: string;
	// 	date: string;
	// }

	// Required properties
	// const galleryData: Required<GalleryDataTypes[]> = [
	// { img: "/gallery/1.jpg", date: "26/11/21" },
	// { img: "/gallery/2.jpg", date: "8/7/23" },
	// { img: "/gallery/3.jpg", date: "18/7/23" },
	// { img: "/gallery/4.jpg", date: "13/7/24" },
	// { img: "/gallery/5.jpg", date: "13/7/24" },
	// ];

	return (
		<div className="gallery">
			<h2 className="gallery__title">{t("gallery_title")}</h2>
			<p>{t("coming_soon")}</p>
			{/* <Swiper
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
				className={styles["mySwiper"]}
			>
				{galleryData.map(({ img, date }, index) => {
					return (
						<SwiperSlide
							key={index}
							className={styles["swiper-card"]}
							data-date={date}
						>
							<img src={img} alt="" loading="lazy" />
						</SwiperSlide>
					);
				})}
			</Swiper> */}
		</div>
	);
};

export default Gallery;
