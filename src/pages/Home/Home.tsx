import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import AboutUs from "../../components/AboutUs/AboutUs";
import Products from "../../components/Products/Products";
import Contacts from "../../components/Contacts/Contacts";
import { HashLink } from "react-router-hash-link";
import video from "/video.mp4";
import "./Home.scss";

interface ProductsData {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string;
	desc: string;
	variants: {
		id: string;
		images?: string[];
		state?: string;
	}[];
	isOrganic?: boolean;
	harvest: number[];
}

interface HomeProps {
	productsData: ProductsData[];
}

const Home: React.FC<HomeProps> = ({ productsData }) => {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t("home.title") + " / " + t("company_name")}</title>
				<link rel="canonical" href="https://yagodakarpat.com/" />
			</Helmet>
			<main>
				<div className="home js-home" id="home">
					<div className="home-container">
						<video
							className="home-container__video"
							loop
							autoPlay
							muted
							playsInline
							src={video}
						></video>
						<h1 className="home-container__title">{t("company_full_name")}</h1>
						<h2 className="home-container__sec-title">{t("home.title")}</h2>
						<h3 style={{ color: "#fff" }}>{t("home.sec_title")}</h3>

						<HashLink className="home-container__link" smooth to={"/#contacts"}>
							{t("contact_us")}
						</HashLink>
					</div>
				</div>
				<AboutUs productsData={productsData} />
				<Products productsData={productsData} />
				<Contacts />
			</main>
		</>
	);
};

export default Home;
