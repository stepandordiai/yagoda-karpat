import { getTranslations } from "next-intl/server";
import TelIcon from "@/components/icons/TelIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import PinIcon from "@/components/icons/PinIcon";
import ContactDetailsClient from "./ContactDetailsClient";
import "./ContactDetails.scss";

export default async function ContactDetails() {
	const t = await getTranslations();

	return (
		<div className="contacts-icons-container">
			<a href="tel:+380968065513" className="contacts__info-container">
				<TelIcon size={40} />
				<span>+38 (096) 806 55 13</span>
			</a>
			<a
				href="mailto:info@yagodakarpat.com"
				className="contacts__info-container"
			>
				<EmailIcon size={40} />
				<span>info@yagodakarpat.com</span>
			</a>
			<a
				className="contacts__info-container"
				href="https://maps.app.goo.gl/ti6CzhjdpFoS8ytz7"
				target="_blank"
			>
				<PinIcon size={40} />
				<span>{t("contacts.address")}</span>
			</a>
			<ContactDetailsClient />
		</div>
	);
}
