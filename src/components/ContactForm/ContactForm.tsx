"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import "./ContactForm.scss";

type ContactFormProps = {
	heading: string;
	requestedProduct?: string;
};

const ContactForm = ({ heading, requestedProduct = "" }: ContactFormProps) => {
	const t = useTranslations();

	const initForm = {
		name: "",
		company: "",
		email: "",
		requested_product: requestedProduct,
		message: "",
	};

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState(initForm);

	const createContactsLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const { error } = await supabase.from("clients").insert([form]);

		// TODO: learn this
		if (error) {
			if (error.code !== "23505") setError(error.message);
		} else {
			setSuccess(true);
			setForm(initForm);
		}

		setLoading(false);
	};

	const handleForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="contact-form">
			<h3 className="form__title">{heading}</h3>
			{error && <span style={{ color: "red" }}>{error}</span>}
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
				{requestedProduct && (
					<div className="input-container">
						<label className="contact-label" htmlFor="product">
							{t("product_page.productRequested")}
						</label>
						<input
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.requested_product}
							className="form__input"
							id="product"
							name="requested_product"
							type="text"
						/>
					</div>
				)}
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
					{loading ? t("contactForm.sending") : t("contacts.submit")}
				</button>
			</form>
			{success && (
				<div className="success-modal">
					<p>{t("contactForm.success")}</p>
					<button
						onClick={() => setSuccess(false)}
						className="success-btn btn--bold"
					>
						{t("contactForm.close")}
					</button>
				</div>
			)}
		</div>
	);
};

export default ContactForm;
