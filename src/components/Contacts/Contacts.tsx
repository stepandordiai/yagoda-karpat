import { useTranslation } from "react-i18next";
import PageTitle from "../PageTitle/PageTitle";
import OurCertificates from "../OurCertificates/OurCertificates";
import BusinessHours from "../BusinessHours/BusinessHours";
import phoneIcon from "/icons/old-typical-phone.png";
import mailIcon from "/icons/email.png";
import pinIcon from "/icons/pin.png";
import "./Contacts.scss";

const Contacts = () => {
	const { t } = useTranslation();

	return (
		<section className="js-contacts" id="contacts">
			<PageTitle name={t("contacts_title")} />
			<div className="contacts-icons-container">
				<a href="tel:+380968065513" className="icon-container">
					<img src={phoneIcon} alt="" />
					<span>+38 (096) 806 55 13</span>
				</a>
				<a href="mailto:info@yagodakarpat.com" className="icon-container">
					<img src={mailIcon} alt="" />
					<span>info@yagodakarpat.com</span>
				</a>
				<a
					className="icon-container"
					href="https://maps.app.goo.gl/ti6CzhjdpFoS8ytz7"
					target="_blank"
				>
					<img src={pinIcon} alt="" />
					<span>{t("contacts.address")}</span>
				</a>
			</div>
			<div className="form-map-container">
				<form
					className="form"
					action="https://formsubmit.co/info@yagodakarpat.com"
					method="POST"
				>
					<h2 className="form__title">{t("contacts.contact_us_title")}</h2>
					<div className="input-container">
						<label className="contact-label" htmlFor="first-name">
							{t("contacts.first_name")}
						</label>
						<input
							className="form__input"
							id="first-name"
							name="firstName"
							autoComplete="given-name"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label className="contact-label" htmlFor="last-name">
							{t("contacts.last_name")}
						</label>
						<input
							className="form__input"
							id="last-name"
							name="lastName"
							autoComplete="family-name"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label className="contact-label" htmlFor="phone-number">
							{t("contacts.tel")}
						</label>
						<input
							className="form__input"
							id="phone-number"
							name="tel"
							autoComplete="tel"
							type="tel"
						/>
					</div>
					<div className="input-container">
						<label className="contact-label" htmlFor="message">
							{t("contacts.message")}
						</label>
						<textarea name="message" autoComplete="on" id="message"></textarea>
					</div>
					<button className="form-submit-btn" type="submit">
						{t("contacts.submit")}
					</button>
				</form>
				<div className="contacts__map-wrapper">
					<h2 className="contacts__map-title">{t("contacts.map_title")}</h2>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.3077328162444!2d23.7462056!3d48.1042991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47379f0033ca7d7d%3A0xf3d79b73a73bbce3!2z0K_Qs9C-0LTQsCDQmtCw0YDQv9Cw0YIg0KLQntCS!5e0!3m2!1sen!2scz!4v1746348694187!5m2!1sen!2scz"
						className="contacts__map"
						loading="lazy"
					></iframe>
				</div>
			</div>
			<div className="contacts-container">
				<OurCertificates />
				<BusinessHours />
			</div>
		</section>
	);
};
export default Contacts;
