import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import AboutUs from "./../../components/AboutUs/AboutUs";
import Products from "./../../components/Products/Products";
import Contacts from "./../../components/Contacts/Contacts";
import Gallery from "../../components/Gallery/Gallery";
import video from "/video.mp4";
import "./Home.scss";

const Home = () => {
	const { t } = useTranslation();

	function animateVideo() {
		document
			.querySelector(".home-container__video")
			.classList.add("home-container__video--active");
	}

	return (
		<>
			<Helmet>
				<title>{t("home.title")} / Ягода Карпат</title>
				<link rel="canonical" href="https://yagodakarpat.com/" />
			</Helmet>
			<div className="home js-home" id="home">
				<div className="home-container">
					<video
						className="home-container__video"
						loop
						autoPlay
						muted
						playsInline
						src={video}
						onLoad={animateVideo}
					></video>
					<h1 className="home-container__title">ТОВ Ягода Карпат</h1>
					<h2 className="home-container__sec-title">{t("home.title")}</h2>
					<h3 style={{ color: "#fff" }}>{t("home.sec_title")}</h3>
					<a className="home-container__link" href="#contacts">
						{t("contact_us")}
					</a>
				</div>
			</div>
			<AboutUs />
			<Products />
			<Contacts />
			<Gallery />
		</>
	);
};

export default Home;
