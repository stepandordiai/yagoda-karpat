"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import PlusIcon from "../icons/PlusIcon";
import Script from "next/script";
import "./styles.scss";

type FaqProps = {
	faqs: {
		q: string;
		a: string;
	}[];
};

export default function Faq({ faqs }: FaqProps) {
	const t = useTranslations();

	const [activeFaq, setActiveFaq] = useState(faqs[0]);

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
			<Script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<section className="faq" aria-labelledby="faq-title">
				<header>
					<h2 id="faq-title" className="faq__title">
						{t("faq.title")}
					</h2>
				</header>
				<div className="faq-container">
					<div className="faq-questions">
						{faqs.map((faq, i) => {
							const isActive = faq === activeFaq;
							const questionId = `faq-question-${i}`;
							const answerId = `faq-answer-${i}`;

							return (
								<article key={i}>
									<h3>
										<button
											id={questionId}
											type="button"
											className={classNames("faq__btn", {
												"faq__btn--active": isActive,
											})}
											onClick={() => setActiveFaq(faq)}
											aria-expanded={isActive}
											aria-controls={answerId}
										>
											<span>{t(faq.q)}</span>
											<span
												className={classNames("faq__btn-icon", {
													"faq__btn-icon--active": isActive,
												})}
												aria-hidden="true"
											>
												<PlusIcon size={20} />
											</span>
										</button>
									</h3>
									<div
										id={answerId}
										className={classNames("faq-dd", {
											"faq-dd--active": isActive,
										})}
										aria-labelledby={questionId}
										role="region"
										hidden={!isActive}
									>
										<p>{t(faq.a)}</p>
									</div>
								</article>
							);
						})}
					</div>
					<p className="faq__a">{t(activeFaq.a)}</p>
				</div>
			</section>
		</>
	);
}
