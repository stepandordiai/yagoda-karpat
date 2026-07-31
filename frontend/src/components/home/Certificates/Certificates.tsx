import { getTranslations } from "next-intl/server";
import EyeIcon from "@/components/icons/EyeIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import "./Certificates.scss";

export default async function Certificates() {
	const t = await getTranslations();

	return (
		<section className="certificates">
			<div>
				<h2 className="certificates__title">{t("certificates_title")}</h2>
				<p>{t("ourCertificates.desc")}</p>
			</div>
			<div className="certificates-container">
				<div className="certificates__doc">
					<span>Organic Certificate (.pdf)</span>
					<div className="certificates__link-container">
						<a
							className="certificates__link"
							href="/pdf/yagoda-karpat-organic-certificate.pdf"
							target="_blank"
							rel="noopener noreferrer"
							title=""
						>
							<EyeIcon />
						</a>
						<a
							className="certificates__link"
							href="/pdf/yagoda-karpat-organic-certificate.pdf"
							download
						>
							<DownloadIcon />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
