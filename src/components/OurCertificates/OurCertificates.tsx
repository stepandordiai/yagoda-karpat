import { useTranslation } from "react-i18next";
import organicStandardImg from "/certificates/organic-standard.jpg";
import "./OurCertificates.scss";

const OurCertificates = () => {
	const { t } = useTranslation();

	return (
		<div className="our-certificates">
			<h3 className="our-certificates__title">{t("certificates_title")}</h3>
			<p>{t("ourCertificates.desc")}</p>
			<img
				src={organicStandardImg}
				alt="Organic Standard Certificate"
				loading="lazy"
			/>
		</div>
	);
};

export default OurCertificates;
