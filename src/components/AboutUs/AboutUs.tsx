import { Product } from "../../interfaces/Product";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import worldMapImg from "../../assets/eu-map.svg";
import Gallery from "../Gallery/Gallery";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutUs.scss";

type AboutUsProps = {
	productsData: Product[];
};

const dateNow = new Date();
const companyEstablishedDate = new Date("2010-01-01");
const diffInYears =
	dateNow.getFullYear() - companyEstablishedDate.getFullYear();

const AboutUs: React.FC<AboutUsProps> = ({ productsData }) => {
	const { t } = useTranslation();

	// FIXME:
	useEffect(() => {
		async function loadSVG() {
			const response = await fetch(worldMapImg);
			const svgText = await response.text();
			const svgContainer = document.getElementById(
				"svgContainer"
			) as HTMLDivElement | null;

			if (!svgContainer) return;
			svgContainer.innerHTML = svgText;
		}

		loadSVG();

		const statsCards = document.querySelectorAll(
			".stats-card"
		) as NodeListOf<HTMLDivElement>;
		const counters = document.querySelectorAll(
			".counter"
		) as NodeListOf<HTMLParagraphElement>;
		const activatedCards = new Set<number>();

		function handleCounter() {
			statsCards.forEach((card, index) => {
				const cardRect = card.getBoundingClientRect().top;
				const targetValue = Number(counters[index].dataset.value);

				if (cardRect < window.innerHeight - 25 && !activatedCards.has(index)) {
					let startValue: number = 0;

					function startCount() {
						setTimeout(() => {
							if (startValue < targetValue) {
								startValue += 1;
								counters[index].textContent = startValue.toString();
								startCount();
							}
						}, 50);
					}
					startCount();
					activatedCards.add(index);
				}
			});
		}

		handleCounter();

		document.addEventListener("scroll", handleCounter);

		return () => document.removeEventListener("scroll", handleCounter);
	}, []);

	return (
		<div className="about-us js-about-us" id="about-us">
			<SectionTitle name={t("about_us_title")} />
			<h3 className="about-us__sec-info">{t("about_us.title")}.</h3>
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
						<span className="counter" data-value={50}>
							0
						</span>
						<span>+</span>
					</p>
					<p>{t("about_us.volume")}</p>
				</div>
			</div>
			<Gallery />
			<h3 className="world-map__title">{t("about_us.map_title")}</h3>
			<div className="world-map__container" id="svgContainer"></div>
		</div>
	);
};

export default AboutUs;
