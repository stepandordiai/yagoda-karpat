"use client";

import { useTranslations } from "next-intl";
import "./ContactForm.scss";

const ContactForm = () => {
	const t = useTranslations();

	return (
		<div className="contact-form">
			<h3 className="form__title">{t("contacts.contact_us_title")}</h3>
			<form
				className="form"
				action="https://formsubmit.co/info@yagodakarpat.com"
				method="POST"
			>
				<div className="input-container">
					<label className="contact-label" htmlFor="name">
						{t("contacts.name")}
					</label>
					<input
						className="form__input"
						id="name"
						name="name"
						autoComplete="name"
						type="text"
						required
					/>
				</div>
				<div className="input-container">
					<label className="contact-label" htmlFor="company">
						{t("product_page.company")}
					</label>
					<input
						className="form__input"
						id="company"
						name="company"
						type="text"
						required
					/>
				</div>
				<div className="input-container">
					<label className="contact-label" htmlFor="email">
						{t("contacts.email")}
					</label>
					<input
						className="form__input"
						id="email"
						name="email"
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
						rows={3}
						name="message"
						id="message"
						placeholder={t("product_page.messagePlaceholder")}
					></textarea>
				</div>
				<button className="form-submit-btn" type="submit">
					{t("contacts.submit")}
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
