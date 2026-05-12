"use client";

import { useTranslations } from "next-intl";

export default function ContactDetailsClient() {
	const t = useTranslations();

	// FIXME:
	let isCopyTxt = false;

	const handleCopyBtn = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.TouchEvent<HTMLButtonElement>,
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
		<button
			onClick={handleCopyBtn}
			className="contacts__info-container"
			data-value="41042911"
		>
			<span style={{ fontWeight: 600 }}>{t("companyCode")}</span>
			<span>41042911</span>
		</button>
	);
}
