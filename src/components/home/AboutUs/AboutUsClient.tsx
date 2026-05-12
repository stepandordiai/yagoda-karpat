"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
const dateNow = new Date();
const companyEstablishedDate = new Date("2010-01-01");

type AboutUsClientProps = {
	productsLength: number;
};

export default function AboutUsClient({ productsLength }: AboutUsClientProps) {
	const t = useTranslations();

	const diffInYears =
		dateNow.getFullYear() - companyEstablishedDate.getFullYear();

	// FIXME:
	useEffect(() => {
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
		<>
			{/* TODO: learn this */}
			<dl className="about-us__stats">
				<div className="stats-card">
					<dt>{t("about_us.year")}</dt>
					<dd className="counter" data-value={diffInYears}>
						{diffInYears}
					</dd>
				</div>
				<div className="stats-card">
					<dt>{t("about_us.product")}</dt>
					<dd className="counter" data-value={productsLength}>
						{productsLength}
					</dd>
				</div>
				<div className="stats-card">
					<dt>{t("about_us.volume")}</dt>
					<dd>
						<span className="counter" data-value={50}>
							50
						</span>
						<span>+</span>
					</dd>
				</div>
			</dl>
		</>
	);
}
