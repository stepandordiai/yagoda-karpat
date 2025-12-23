"use client";

import { useTranslations } from "next-intl";
import SectionTitle from "../SectionTitle/SectionTitle";
import BusinessHours from "../BusinessHours/BusinessHours";
import ContactForm from "../ContactForm/ContactForm";
import ContactDetails from "../ContactDetails/ContactDetails";
import "./Contacts.scss";

const Contacts = () => {
	const t = useTranslations();

	return (
		<section className="js-contacts" id="contacts">
			<SectionTitle name={t("contacts_title")} />
			<div className="contacts-wrapper">
				<div>
					<ContactDetails />
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
			<div className="contacts-wrapper">
				<div className="contacts__map-wrapper">
					<h3 className="contacts__map-title">{t("contacts.map_title")}</h3>
					<iframe
						className="contacts__map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.3077328162444!2d23.7462056!3d48.1042991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47379f0033ca7d7d%3A0xf3d79b73a73bbce3!2z0K_Qs9C-0LTQsCDQmtCw0YDQv9Cw0YIg0KLQntCS!5e0!3m2!1sen!2scz!4v1746348694187!5m2!1sen!2scz"
						title={`${t("company_name")} location on Google Maps`}
						loading="lazy"
					></iframe>
				</div>
				<BusinessHours />
			</div>
		</section>
	);
};
export default Contacts;
