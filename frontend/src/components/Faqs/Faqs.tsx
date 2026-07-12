import { getTranslations } from "next-intl/server";
import FaqsClient from "./FaqsClient";
import Faq from "@/interfaces/Faq";
import "./styles.scss";

type FaqsProps = {
	faqs: Faq[];
};

export default async function Faqs({ faqs }: FaqsProps) {
	const t = await getTranslations();

	// TODO: learn this
	// FAQPage
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: t(faq.q),
			acceptedAnswer: {
				"@type": "Answer",
				text: t(faq.a),
			},
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<section className="faq" aria-labelledby="faq-title">
				<h2 id="faq-title" className="faq__title">
					{t("faq.title")}
				</h2>
				<FaqsClient faqs={faqs} />
			</section>
		</>
	);
}
