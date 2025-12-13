import { useTranslation } from "react-i18next";
import Pdf from "../Pdf/Pdf";
import pdf from "/pdf/yagoda-karpat-organic-certificate.pdf";
import PdfIcon from "../../icons/PdfIcon";
import "./OurCertificates.scss";

const OurCertificates = () => {
	const { t } = useTranslation();

	return (
		<div className="our-certificates">
			<div>
				<h3 className="our-certificates__title">{t("certificates_title")}</h3>
				<p style={{ textAlign: "justify" }}>{t("ourCertificates.desc")}</p>
			</div>
			<div>
				<Pdf file={pdf} />
				<a className="pdf-link" href={pdf} download={true}>
					<span>Download certificate</span>
					<PdfIcon />
				</a>
			</div>
		</div>
	);
};

export default OurCertificates;
