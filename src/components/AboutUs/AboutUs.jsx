import { useTranslation } from "react-i18next";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect } from "react";
// import ProductsData from "../../data/productsData";
import worldMapImg from "../../assets/world-map.svg";
import "./AboutUs.scss";

const AboutUs = ({ productsData }) => {
	const { t } = useTranslation();

	const dateNow = new Date();
	const companyEstablishedDate = new Date("2010");
	const diffInMilliseconds = dateNow - companyEstablishedDate;
	const diffInYears = Math.floor(
		diffInMilliseconds / 1000 / 60 / 60 / 24 / 365.25
	);

	useEffect(() => {
		async function loadSVG() {
			const response = await fetch(worldMapImg);
			const svgText = await response.text();
			document.getElementById("svgContainer").innerHTML = svgText;
		}

		loadSVG();

		document.querySelectorAll(".stats-card").forEach((card, index) => {
			let isActivated = false;
			function handleCounter() {
				const cardRect = card.getBoundingClientRect().top;
				const counters = document.querySelectorAll(".counter");
				if (cardRect < window.innerHeight - 25) {
					if (!isActivated) {
						let startValue = 0;
						function start() {
							setTimeout(() => {
								if (startValue < counters[index].dataset.value) {
									startValue += 1;
									counters[index].textContent = startValue;
									start();
								}
							}, 50);
						}
						start();
					}
					isActivated = true;
				}
			}

			document.addEventListener("scroll", handleCounter);

			return () => {
				document.removeEventListener("scroll", handleCounter);
			};
		});
	}, []);

	return (
		<div className="about-us js-about-us" id="about-us">
			<PageTitle name={t("about_us_title")} />
			<h3 className="about-us__sec-info">{t("about_us.sec_title")}</h3>
			<div className="about-us__stats">
				<div className="stats-card">
					<p className="counter" data-value={diffInYears}>
						0
					</p>
					<p>{t("about_us.year")}</p>
				</div>
				<div className="stats-card">
					<p className="counter" data-value={productsData.length}>
						0
					</p>
					<p>{t("about_us.product")}</p>
				</div>
				<div className="stats-card">
					<p>
						<span className="counter" data-value="50">
							0
						</span>
						<span>+</span>
					</p>
					<p>{t("about_us.volume")}</p>
				</div>
			</div>
			<h3 className="world-map__title">{t("about_us.map_title")}</h3>
			<div className="world-map__container" id="svgContainer"></div>
		</div>
	);
};

export default AboutUs;
