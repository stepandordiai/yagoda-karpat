import { getTranslations } from "next-intl/server";
import EyeIcon from "@/components/icons/EyeIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import "./Certificates.scss";

const certificates = [
	{
		id: 1,
		label: "Yagoda Karpat LLC Organic Certificate",
		path: "/pdf/organic-certificate-yagoda-karpat-llc.pdf",
		url: "https://organicstandard.ua/en/clients/f92494b2204a431d89b7a64d7860cfa2",
		img: "/icons/organic-logo.jpg",
	},
	{
		id: 2,
		label: "WEST BERRY LLC Organic Certificate",
		path: "/pdf/organic-certificate-west-berry-llc.pdf",
		url: "https://organicstandard.ua/en/clients/bfd7e2dbe2204288a438f019743cd07c",
		img: "/icons/organic-logo.jpg",
	},
];

export default async function Certificates() {
	const t = await getTranslations();

	return (
		<section className="certificates">
			<div>
				<h2 className="certificates__title">{t("certificates_title")}</h2>
				<p>{t("ourCertificates.desc")}</p>
			</div>
			<div className="certificates-container">
				{certificates.map((certificate) => {
					return (
						<div key={certificate.id} className="certificates__doc">
							<span>{certificate.label} (.pdf)</span>
							<div className="certificates__link-container">
								<a
									className="certificates__link"
									href={certificate.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<LinkIcon />
								</a>
								<a
									className="certificates__link"
									href={certificate.path}
									target="_blank"
									rel="noopener noreferrer"
									title={t("ourCertificates.viewCertificate")}
									aria-label={t("ourCertificates.viewCertificate")}
								>
									<EyeIcon />
								</a>
								<a
									className="certificates__link"
									href={certificate.path}
									download
									title={t("ourCertificates.downloadCertificate")}
									aria-label={t("ourCertificates.downloadCertificate")}
								>
									<DownloadIcon />
								</a>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
