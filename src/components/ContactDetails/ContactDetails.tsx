import { useTranslation } from "react-i18next";
import phoneIcon from "/icons/old-typical-phone.png";
import mailIcon from "/icons/email.png";
import pinIcon from "/icons/pin.png";
import "./ContactDetails.scss";

const ContactDetails = () => {
	const { t } = useTranslation();

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
				<img src={phoneIcon} alt="" />
				<span>+38 (096) 806 55 13</span>
			</a>
			<a
				href="mailto:info@yagodakarpat.com"
				className="contacts__info-container"
			>
				<img src={mailIcon} alt="" />
				<span>info@yagodakarpat.com</span>
			</a>
			<a
				className="contacts__info-container"
				href="https://maps.app.goo.gl/ti6CzhjdpFoS8ytz7"
				target="_blank"
			>
				<img src={pinIcon} alt="" />
				<span>{t("contacts.address")}</span>
			</a>
			<button
				onClick={handleCopyBtn}
				className="contacts__info-container"
				data-value="41042911"
			>
				<span style={{ fontWeight: 600 }}>ЄДРПОУ</span>
				<span>41042911</span>
			</button>
		</div>
	);
};

export default ContactDetails;
