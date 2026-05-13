import { getTranslations } from "next-intl/server";
import PdfIcon from "@/components/icons/PdfIcon";
import Image from "next/image";
import "./Certificates.scss";

export default async function Certificates() {
	const t = await getTranslations();

	return (
		<section className="certificates">
			<div>
				<h3 className="certificates__title">{t("certificates_title")}</h3>
				<p>{t("ourCertificates.desc")}</p>
			</div>
			{/* FIXME: */}
			<div className="certificates-container">
				<Image
					style={{ objectFit: "contain" }}
					src="/yagoda-karpat-organic-certificate-1.jpg"
					width={300}
					height={424}
					alt="Organic Standard certificate"
				/>
				<Image
					style={{ objectFit: "contain" }}
					src="/yagoda-karpat-organic-certificate-2.jpg"
					width={300}
					height={424}
					alt="Organic Standard certificate"
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
}
