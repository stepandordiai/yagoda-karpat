"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import "./ContactForm.scss";

const initForm = {
	name: "",
	company: "",
	email: "",
	message: "",
};

const ContactForm = () => {
	const t = useTranslations();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState(initForm);

	const createContactsLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const { error } = await supabase.from("clients").insert([form]);
		if (error) {
			console.error("Insert error:", error.message);
			setError(error.message);
			setLoading(false);
		} else {
			setSuccess(true);
			setForm(initForm);
			setLoading(false);
		}
	};

	const handleForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="contact-form">
			<h3 className="form__title">{t("contacts.contact_us_title")}</h3>
			<form className="form" onSubmit={createContactsLead}>
				<div className="input-container">
					<label className="contact-label" htmlFor="name">
						{t("contacts.name")}
					</label>
					<input
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.name}
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
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.company}
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
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.email}
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
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.message}
						rows={3}
						name="message"
						id="message"
						placeholder={t("product_page.messagePlaceholder")}
					></textarea>
				</div>
				<button
					className={`form-submit-btn btn--bold ${loading ? "form-submit-btn--loading" : ""}`}
					type="submit"
				>
					{loading ? "Sending..." : t("contacts.submit")}
				</button>
			</form>
			{success && (
				<div className="success-modal">
					<p>Thank you for your inquiry. We will contact you shortly.</p>
					<button
						onClick={() => setSuccess(false)}
						className="success-btn btn--bold"
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default ContactForm;
