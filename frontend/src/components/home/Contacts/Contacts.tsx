import { getTranslations } from "next-intl/server";
import BusinessHours from "@/components/BusinessHours/BusinessHours";
import ContactForm from "@/components/ContactForm/ContactForm";
import ContactDetails from "@/components/ContactDetails/ContactDetails";
import Map from "@/components/Map/Map";
import "./Contacts.scss";

export default async function Contacts() {
	const t = await getTranslations();

	return (
		<section className="js-contacts" id="contacts">
			<h2 className="section-title">{t("nav.contacts")}</h2>
			<div className="contacts-wrapper">
				<div>
					<ContactDetails />
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
			<div className="contacts-wrapper">
				<Map />
				<BusinessHours />
			</div>
		</section>
	);
}
