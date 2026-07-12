"use client";

import { useState } from "react";
import classNames from "classnames";
import PlusIcon from "@/components/icons/PlusIcon";
import { useTranslations } from "next-intl";
import Faq from "@/interfaces/Faq";

type FaqsClientProps = {
	faqs: Faq[];
};

export default function FaqsClient({ faqs }: FaqsClientProps) {
	const t = useTranslations();

	const [activeFaq, setActiveFaq] = useState(faqs[0]);

	return (
		<ul className="faq-questions">
			{faqs.map((faq, i) => {
				const isActive = faq === activeFaq;
				const questionId = `faq-question-${i}`;
				const answerId = `faq-answer-${i}`;

				return (
					<li key={i}>
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
							hidden={!isActive}
						>
							<p>{t(faq.a)}</p>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
