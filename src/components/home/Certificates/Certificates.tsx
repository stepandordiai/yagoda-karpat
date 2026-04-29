"use client";

import { useTranslations } from "next-intl";
import PdfIcon from "@/components/icons/PdfIcon";
import "./Certificates.scss";
import Image from "next/image";

const Certificates = () => {
	const t = useTranslations();

	return (
		<section className="certificates">
			<div>
				<h3 className="certificates__title">{t("certificates_title")}</h3>
				<p>{t("ourCertificates.desc")}</p>
			</div>
			<div>
				<Image
					src="/yagoda-karpat-organic-certificate.jpg"
					width={300}
					height={424.31}
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
