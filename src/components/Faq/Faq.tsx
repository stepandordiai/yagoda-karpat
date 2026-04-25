"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import PlusIcon from "../icons/PlusIcon";
import "./styles.scss";

const faqs = [
	{
		q: "faq.q.1",
		a: "faq.a.1",
	},
	{
		q: "faq.q.2",
		a: "faq.a.2",
	},
	{
		q: "faq.q.3",
		a: "faq.a.3",
	},
	{
		q: "faq.q.4",
		a: "faq.a.4",
	},
	{
		q: "faq.q.5",
		a: "faq.a.5",
	},
	{
		q: "faq.q.6",
		a: "faq.a.6",
	},
];

export default function Faq() {
	const t = useTranslations();

	const [activeFaq, setActiveFaq] = useState(faqs[0]);

	return (
		<section className="faq">
			<h3 className="faq__title">FAQ</h3>
			<div className="faq-container">
				<div className="faq-questions">
					{faqs.map((faq, i) => {
						return (
							<div key={i}>
								<button
									className={classNames("faq__btn", {
										"faq__btn--active": activeFaq === faq,
									})}
									onClick={() => setActiveFaq(faq)}
								>
									<span>{t(faq.q)}</span>
									<span
										className={classNames("faq__btn-icon", {
											"faq__btn-icon--active": activeFaq === faq,
										})}
									>
										<PlusIcon size={20} />
									</span>
								</button>
								<div
									className={classNames("faq-dd", {
										"faq-dd--active": faq === activeFaq,
									})}
								>
									<p>{t(activeFaq.a)}</p>
								</div>
							</div>
						);
					})}
				</div>
				<p className="faq__a">{t(activeFaq.a)}</p>
			</div>
		</section>
	);
}
