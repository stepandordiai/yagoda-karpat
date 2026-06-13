import { getTranslations } from "next-intl/server";
import classNames from "classnames";
import { getLocale } from "next-intl/server";
import businessHours from "@/data/businessHours.json";
import styles from "./BusinessHours.module.scss";

const MONDAY_DATE = new Date(2024, 0, 1);

const getWeekday = (index: number, locale: string) => {
	const date = new Date(MONDAY_DATE);
	date.setDate(MONDAY_DATE.getDate() + index);
	return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
};

export default async function BusinessHours() {
	const locale = await getLocale();
	const t = await getTranslations();

	const dayNow = new Date().getDay();
	const correctDayNow = dayNow === 0 ? 6 : dayNow - 1;

	return (
		<div className={styles["business-hours"]}>
			<h3 className={styles["business-hours__title"]}>
				{t("business_hours_title")}
			</h3>
			<ul className={styles["business-hours__list"]}>
				{businessHours.map((day, index) => {
					return (
						<li
							key={index}
							className={classNames({
								[styles["day--active"]]: correctDayNow === index,
							})}
						>
							<span>{getWeekday(index, locale)}:</span>
							<span>{day.hours === "closed" ? t("closed") : day.hours}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
