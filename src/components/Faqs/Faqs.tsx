import { getTranslations } from "next-intl/server";
import FaqsClient from "./FaqsClient";
import "./styles.scss";

type Faq = {
	q: string;
	a: string;
};

type FaqsProps = {
	faqs: Faq[];
};

export default async function Faqs({ faqs }: FaqsProps) {
	const t = await getTranslations();

	// TODO: learn this
	const faqSchema = {
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
			{/* TODO: learn this */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<section className="faq" aria-labelledby="faq-title">
				<header>
					<h2 id="faq-title" className="faq__title">
						{t("faq.title")}
					</h2>
				</header>
				<FaqsClient faqs={faqs} />
			</section>
		</>
	);
}
