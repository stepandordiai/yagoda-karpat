"use client";

import { useTranslations } from "next-intl";
import "./ContactDetails.scss";

const ContactDetails = () => {
	const t = useTranslations();

	// FIXME:
	let isCopyTxt = false;

	const handleCopyBtn = (
		e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
	): void => {
		const target = e.currentTarget;
		const targetValue = e.currentTarget.dataset.value;

		if (targetValue && !isCopyTxt) {
			navigator.clipboard.writeText(targetValue);
			const copyTxt = document.createElement("div");
			copyTxt.classList.add("contacts__copy-txt");
			target.appendChild(copyTxt);
			copyTxt.textContent = t("copied");
			target.classList.add("contacts__info-container--active");
			isCopyTxt = true;

			setTimeout(() => {
				copyTxt.remove();
				target.classList.remove("contacts__info-container--active");
				isCopyTxt = false;
			}, 3000);
		}
	};

	return (
		<div className="contacts-icons-container">
			<a href="tel:+380968065513" className="contacts__info-container">
				<img src="/icons/telephone.svg" alt="" />
				<span>+38 (096) 806 55 13</span>
			</a>
			<a
				href="mailto:info@yagodakarpat.com"
				className="contacts__info-container"
			>
				<img src="/icons/envelope.svg" alt="" />
				<span>info@yagodakarpat.com</span>
			</a>
			<a
				className="contacts__info-container"
				href="https://maps.app.goo.gl/ti6CzhjdpFoS8ytz7"
				target="_blank"
			>
				<img src="/icons/geo.svg" alt="" />
				<span>{t("contacts.address")}</span>
			</a>
			<button
				onClick={handleCopyBtn}
				className="contacts__info-container"
				data-value="41042911"
			>
				<span style={{ fontWeight: 600 }}>{t("companyCode")}</span>
				<span>41042911</span>
			</button>
		</div>
	);
};

export default ContactDetails;
