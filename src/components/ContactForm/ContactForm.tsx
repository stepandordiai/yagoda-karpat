import { useTranslation } from "react-i18next";
import "./ContactForm.scss";

const ContactForm = () => {
	const { t } = useTranslation();

	return (
		<>
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
				<div className="input-container textarea-container">
					<label className="contact-label" htmlFor="message">
						{t("contacts.message")}
					</label>
					<textarea name="message" autoComplete="on" id="message"></textarea>
				</div>
				<button className="form-submit-btn" type="submit">
					{t("contacts.submit")}
				</button>
			</form>
		</>
	);
};

export default ContactForm;
