import { getTranslations } from "next-intl/server";
import PdfIcon from "@/components/icons/PdfIcon";
import Image from "next/image";
import "./Certificates.scss";

export default async function Certificates() {
	const t = await getTranslations();

	return (
		<section className="certificates">
			<div>
				<h2 className="certificates__title">{t("certificates_title")}</h2>
				<p>{t("ourCertificates.desc")}</p>
			</div>
			{/* TODO: learn this */}
			<div className="certificates-container">
				<div className="certificate-wrapper">
					<Image
						style={{ objectFit: "contain" }}
						src="/yagoda-karpat-organic-certificate-1.jpg"
						fill
						alt="Organic Standard certificate first page"
					/>
				</div>
				<div className="certificate-wrapper">
					<Image
						style={{ objectFit: "contain" }}
						src="/yagoda-karpat-organic-certificate-2.jpg"
						fill
						alt="Organic Standard certificate second page"
					/>
				</div>
				<a
					className="pdf-link"
					href="/pdf/yagoda-karpat-organic-certificate.pdf"
					download
				>
					<span>{t("downloadCertificate")}</span>
					<PdfIcon />
				</a>
			</div>
		</section>
	);
}
