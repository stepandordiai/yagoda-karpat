import { useTranslation } from "react-i18next";
import styles from "./BusinessHours.module.scss";

const BusinessHours = () => {
	const { t } = useTranslation();

	const date = new Date();

	const dayNow = date.getDay();

	const activeDay = styles["day--active"];

	return (
		<div className={styles["business-hours"]}>
			<h2 className={styles["business-hours__title"]}>
				{t("business_hours_title")}
			</h2>
			<ul className={styles["business-hours__list"]}>
				<li className={dayNow == 1 ? activeDay : ""}>
					<span>{t("mon")}:</span> <span>8:00 - 19:00</span>
				</li>
				<li className={dayNow == 2 ? activeDay : ""}>
					<span>{t("tue")}:</span> <span>8:00 - 19:00</span>
				</li>
				<li className={dayNow == 3 ? activeDay : ""}>
					<span>{t("wed")}:</span> <span>8:00 - 19:00</span>
				</li>
				<li className={dayNow == 4 ? activeDay : ""}>
					<span>{t("thu")}:</span> <span>8:00 - 19:00</span>
				</li>
				<li className={dayNow == 5 ? activeDay : ""}>
					<span>{t("fri")}:</span> <span>8:00 - 19:00</span>
				</li>
				<li className={dayNow == 6 ? activeDay : ""}>
					<span>{t("sat")}:</span> <span>8:00 - 19:00</span>
				</li>
				<li className={dayNow == 0 ? activeDay : ""}>
					<span>{t("sun")}:</span> <span>{t("closed")}</span>
				</li>
			</ul>
		</div>
	);
};

export default BusinessHours;
