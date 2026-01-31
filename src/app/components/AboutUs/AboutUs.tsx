"use client";

import { Product } from "../../interfaces/Product";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
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
	const t = useTranslations();

	// FIXME:
	useEffect(() => {
		async function loadSVG() {
			const response = await fetch("/eu-map.svg");
			const svgText = await response.text();
			const svgContainer = document.getElementById(
				"svgContainer",
			) as HTMLDivElement | null;

			if (!svgContainer) return;
			svgContainer.innerHTML = svgText;
		}

		loadSVG();

		const statsCards = document.querySelectorAll(
			".stats-card",
		) as NodeListOf<HTMLDivElement>;
		const counters = document.querySelectorAll(
			".counter",
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

		window.addEventListener("scroll", handleCounter);

		return () => window.removeEventListener("scroll", handleCounter);
	}, []);

	return (
		<section className="about-us js-about-us" id="about-us">
			<SectionTitle name={t("about_us_title")} />
			<div className="about-us-container">
				<p>{t("about_us.paragraph1")}</p>
				<p>{t("about_us.paragraph2")}</p>
				<div className="about-us__stats">
					<div className="stats-card">
						<p className="counter" data-value={diffInYears}>
							{diffInYears}
						</p>
						<p>{t("about_us.year")}</p>
					</div>
					<div className="stats-card">
						<p className="counter" data-value={productsData.length}>
							{productsData.length}
						</p>
						<p>{t("about_us.product")}</p>
					</div>
					<div className="stats-card">
						<p>
							<span className="counter" data-value={50}>
								50
							</span>
							<span>+</span>
						</p>
						<p>{t("about_us.volume")}</p>
					</div>
				</div>
				<p>{t("about_us.paragraph3")}</p>
			</div>

			<Gallery />
			<h3 className="world-map__title">{t("about_us.map_title")}</h3>
			<div className="world-map__container" id="svgContainer"></div>
		</section>
	);
};

export default AboutUs;
