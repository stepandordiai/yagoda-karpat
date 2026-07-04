"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { reportConversion } from "@/lib/gtagReportConversion";
import "./ContactForm.scss";

type ContactFormProps = {
	requestedProduct?: string;
};

const ContactForm = ({ requestedProduct = "" }: ContactFormProps) => {
	const t = useTranslations("contactForm");

	const initForm = {
		name: "",
		company: "",
		country: "",
		email: "",
		requested_product: requestedProduct,
		quantity: "",
		message: "",
	};

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState(initForm);

	const handleForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// Supabase
	const insertLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const { error } = await supabase.from("leads").insert([form]);

		if (error) {
			if (error) {
				console.error("Lead insert failed:", error);
				setError(t("error"));
			}
		} else {
			reportConversion("AW-16930854291/aCjkCMaZisEcEJOroYk_");
			setSuccess(true);
			setForm(initForm);
		}

		setLoading(false);
	};

	return (
		<div className="contact-form">
			<h3 className="contact-form__heading">{t("heading")}</h3>
			<p className="contact-form__subheading">{t("subheading")}</p>
			{!error && <span style={{ color: "red" }}>{error}</span>}
			<form className="form" onSubmit={insertLead}>
				<div className="input-container">
					<label className="contact-label" htmlFor="name">
						{t("name")} ({t("required")})
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
						{t("company")} ({t("required")})
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
					<label className="contact-label" htmlFor="country">
						{t("country")} ({t("required")})
					</label>
					<input
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.country}
						className="form__input"
						id="country"
						name="country"
						type="text"
						required
					/>
				</div>
				<div className="input-container">
					<label className="contact-label" htmlFor="email">
						{t("email")} ({t("required")})
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
							{t("productRequested")}
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
				<div className="input-container">
					<label className="contact-label" htmlFor="quantity">
						{t("quantity")}
					</label>
					<input
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.quantity}
						className="form__input"
						id="quantity"
						name="quantity"
						autoComplete="quantity"
						type="text"
					/>
				</div>
				<div className="input-container textarea-container">
					<label className="contact-label" htmlFor="message">
						{t("message")} ({t("required")})
					</label>
					<textarea
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.message}
						rows={9}
						name="message"
						id="message"
						required
						maxLength={600}
					></textarea>
					<span className="textarea-count-indicator">
						{form.message.length} / 600
					</span>
				</div>
				<button
					className={`form-submit-btn btn--bold ${loading ? "form-submit-btn--loading" : ""}`}
					type="submit"
					disabled={loading}
				>
					{loading ? t("sending") : t("submit")}
				</button>
			</form>
			{success && (
				<div className="success-modal">
					<p>{t("success")}</p>
					<button
						onClick={() => setSuccess(false)}
						className="success-btn btn--bold"
					>
						{t("close")}
					</button>
				</div>
			)}
		</div>
	);
};

export default ContactForm;
