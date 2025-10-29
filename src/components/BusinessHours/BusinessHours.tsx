import { useTranslation } from "react-i18next";
import styles from "./BusinessHours.module.scss";

const businessHoursData = [
	{
		name: "mon",
		hours: "8:00 - 19:00",
	},
	{
		name: "tue",
		hours: "8:00 - 19:00",
	},
	{
		name: "wed",
		hours: "8:00 - 19:00",
	},
	{
		name: "thu",
		hours: "8:00 - 19:00",
	},
	{
		name: "fri",
		hours: "8:00 - 19:00",
	},
	{
		name: "sat",
		hours: "8:00 - 19:00",
	},
	{
		name: "sun",
		hours: "closed",
	},
];

const BusinessHours = () => {
	const { t } = useTranslation();

	const dayNow = new Date().getDay();
	const correctDayNow = dayNow === 0 ? 6 : dayNow - 1;

	return (
		<div className={styles["business-hours"]}>
			<h3 className={styles["business-hours__title"]}>
				{t("business_hours_title")}
			</h3>
			<ul className={styles["business-hours__list"]}>
				{businessHoursData.map((day, index) => {
					return (
						<li
							className={correctDayNow === index ? styles["day--active"] : ""}
						>
							<span>{t(day.name)}:</span> <span>{t(day.hours)}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default BusinessHours;
