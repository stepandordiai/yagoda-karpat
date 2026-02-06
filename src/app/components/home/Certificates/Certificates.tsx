"use client";

import { useTranslations } from "next-intl";
import PdfIcon from "@/app/icons/PdfIcon";
import "./Certificates.scss";

const Certificates = () => {
	const t = useTranslations();

	return (
		<section className="certificates">
			<div>
				<h3 className="certificates__title">{t("certificates_title")}</h3>
				<p style={{ textAlign: "justify" }}>{t("ourCertificates.desc")}</p>
			</div>
			<div>
				<img
					src="/yagoda-karpat-organic-certificate.jpg"
					width={300}
					alt="Organic Standard certificate"
					loading="lazy"
				/>
				<a
					className="pdf-link"
					href="/pdf/yagoda-karpat-organic-certificate.pdf"
					download={true}
				>
					<span>{t("downloadCertificate")}</span>
					<PdfIcon />
				</a>
			</div>
		</section>
	);
};

export default Certificates;
