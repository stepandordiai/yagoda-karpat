import { Product } from "../../interfaces/Product";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AboutUs from "../../components/AboutUs/AboutUs";
import Products from "../../components/Products/Products";
import Contacts from "../../components/Contacts/Contacts";
import { HashLink } from "react-router-hash-link";
import Container from "../../components/Container/Container";
import classNames from "classnames";
import OurCertificates from "../../components/OurCertificates/OurCertificates";
import video from "/video-c.mp4";
import "./Home.scss";

type HomeProps = {
	productsData: Product[];
};

const Home: React.FC<HomeProps> = ({ productsData }) => {
	const { t } = useTranslation();
	const { lng } = useParams();
	const [isLoaded, setIsLoaded] = useState(false);

	const handleVideo = () => setIsLoaded(true);

	return (
		<>
			<Helmet>
				<meta name="description" content={t("home.desc_seo")} />
				<title>{t("home.title") + " / " + t("company_name")}</title>
				<link rel="canonical" href="https://www.yagodakarpat.com/uk/" />
				<link
					rel="alternate"
					hrefLang="uk"
					href="https://www.yagodakarpat.com/uk/"
				/>
				<link
					rel="alternate"
					hrefLang="en"
					href="https://www.yagodakarpat.com/en/"
				/>
				<link
					rel="alternate"
					hrefLang="x-default"
					href="https://www.yagodakarpat.com/uk/"
				/>
			</Helmet>
			<main>
				<Container>
					<section className="home-hero" id="home">
						<div className="home-container">
							<video
								// TODO: learn this
								onLoadedData={handleVideo}
								className={classNames("home-container__video", {
									loaded: isLoaded,
								})}
								loop
								autoPlay
								muted
								playsInline
								preload="metadata"
							>
								<source src={video} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
							<a
								className="home-container__video-author"
								href="https://www.pexels.com/@ksnblog/"
								target="_blank"
							>
								Sergey k
							</a>
							<p className="home-container__desc">{t("company_full_name")}</p>
							<h1 className="home-container__title">{t("home.title")}</h1>
							<h2 className="home-container__desc">{t("home.sec_title")}</h2>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
								<HashLink
									className="home-container__link"
									smooth
									to={`/${lng}/#products`}
								>
									{t("home.viewProducts")}
								</HashLink>
								<HashLink
									className="home-container__link"
									smooth
									to={`/${lng}/#contacts`}
								>
									{t("home.requestPriceList")}
								</HashLink>
							</div>
						</div>
					</section>
					<AboutUs productsData={productsData} />
					<Products productsData={productsData} />
					<OurCertificates />
					<Contacts />
				</Container>
			</main>
		</>
	);
};

export default Home;
