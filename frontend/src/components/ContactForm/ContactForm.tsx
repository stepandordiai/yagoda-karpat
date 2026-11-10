"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { reportConversion } from "@/lib/gtagReportConversion";
import { EMAIL } from "@/lib/constants";
import "./ContactForm.scss";

type ContactFormProps = {
	requestedProduct?: string;
	heading?: string;
};

const ContactForm = ({
	requestedProduct = "",
	heading = "contactForm.heading",
}: ContactFormProps) => {
	const t = useTranslations();

	const initForm = {
		name: "",
		company: "",
		country: "",
		email: "",
		requested_product: requestedProduct,
		quantity: "1000",
		message: "",
	};

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState(initForm);
	const [paymentTermsCheck, setPaymentTermsCheck] = useState(false);

	const handleForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// Supabase
	const insertLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!paymentTermsCheck) {
			setError(t("contactForm.paymentTerms.required"));
			return;
		}

		setLoading(true);

		const { error } = await supabase.from("leads").insert([form]);

		if (error) {
			// console.error("Lead insert failed:", error);
			setError(t("contactForm.error", { email: EMAIL }));
		} else {
			reportConversion("AW-16930854291/aCjkCMaZisEcEJOroYk_");

			// TODO: LEARN THIS
			fetch("/api/notify-lead", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			}).catch(() => {});

			setSuccess(true);
			setForm(initForm);
			setPaymentTermsCheck(false);
		}

		setLoading(false);
	};

	return (
		<div className="contact-form">
			<h3 className="contact-form__heading">{t(heading)}</h3>
			<div>
				{t.raw("contactForm.subheading").map((p: string) => {
					return (
						<p className="contact-form__subheading" key={p}>
							{p}
						</p>
					);
				})}
			</div>
			{error && <p style={{ color: "#f00" }}>{error}</p>}
			<form className="form" onSubmit={insertLead}>
				<div className="input-container">
					<label className="contact-label" htmlFor="name">
						{t("contactForm.name")}
						<span style={{ color: "#f00" }} aria-hidden="true">
							*
						</span>
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
						{t("contactForm.company")}
						<span style={{ color: "#f00" }} aria-hidden="true">
							*
						</span>
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
						{t("contactForm.country")}
						<span style={{ color: "#f00" }} aria-hidden="true">
							*
						</span>
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
						{t("contactForm.email")}
						<span style={{ color: "#f00" }} aria-hidden="true">
							*
						</span>
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
							{t("contactForm.productRequested")}
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
						{t("contactForm.quantity")}
					</label>
					<input
						onChange={(e) => handleForm(e.target.name, e.target.value)}
						value={form.quantity}
						className="form__input"
						id="quantity"
						name="quantity"
						type="number"
						min={1000}
					/>
				</div>
				<div className="input-container textarea-container">
					<label className="contact-label" htmlFor="message">
						{t("contactForm.message")}
						<span style={{ color: "#f00" }} aria-hidden="true">
							*
						</span>
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
				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					<p style={{ fontWeight: "500" }}>
						{t("contactForm.paymentTerms.title")}
						<span style={{ color: "#f00" }} aria-hidden="true">
							*
						</span>
					</p>
					<p>{t("contactForm.paymentTerms.description")}</p>
					<div className="contact-form__cb-container">
						<input
							className="contact-form__cb"
							type="checkbox"
							id="payment-terms"
							required
							checked={paymentTermsCheck}
							name="paymentTerms"
							onChange={(e) => setPaymentTermsCheck(e.target.checked)}
						/>
						<label style={{ fontWeight: 500 }} htmlFor="payment-terms">
							{t("contactForm.paymentTerms.cbLabel")}
						</label>
					</div>
				</div>
				<button
					className={`form-submit-btn btn--bold ${loading ? "form-submit-btn--loading" : ""}`}
					type="submit"
					disabled={loading}
				>
					{loading ? t("contactForm.sending") : t("contactForm.submit")}
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
