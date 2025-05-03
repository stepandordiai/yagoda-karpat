import { useTranslation } from "react-i18next";
import organicStandardImg from "/assets/certificates/organic-standard.jpg";
import styles from "./OurCertificates.module.scss";

const OurCertificates = () => {
	const { t } = useTranslation();

	return (
		<div className={styles["our-certificates"]}>
			<h2 className={styles["our-certificates__title"]}>
				{t("certificates_title")}
			</h2>
			<img src={organicStandardImg} alt="" />
		</div>
	);
};

export default OurCertificates;
