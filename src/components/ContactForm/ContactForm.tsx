import { useTranslation } from "react-i18next";
import "./ContactForm.scss";

const ContactForm = () => {
	const { t } = useTranslation();

	return (
		<form
			className="form"
			action="https://formsubmit.co/info@yagodakarpat.com"
			method="POST"
		>
			<h3 className="form__title">{t("contacts.contact_us_title")}</h3>
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
					required
				/>
			</div>
			<div className="input-container">
				<label className="contact-label" htmlFor="tel">
					{t("contacts.tel")}
				</label>
				<input
					className="form__input"
					id="tel"
					name="tel"
					autoComplete="tel"
					type="tel"
				/>
			</div>
			<div className="input-container">
				<label className="contact-label" htmlFor="email">
					{t("contacts.email")}
				</label>
				<input
					className="form__input"
					id="email"
					name="tel"
					autoComplete="email"
					type="email"
					required
				/>
			</div>
			<div className="input-container textarea-container">
				<label className="contact-label" htmlFor="message">
					{t("contacts.message")}
				</label>
				<textarea
					name="message"
					autoComplete="on"
					id="message"
					required
				></textarea>
			</div>
			<button className="form-submit-btn" type="submit">
				{t("contacts.submit")}
			</button>
		</form>
	);
};

export default ContactForm;
