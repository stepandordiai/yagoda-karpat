import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import productsData from "@/lib/data/products-data.json";
import AboutUs from "../components/home/AboutUs/AboutUs";
import Contacts from "../components/home/Contacts/Contacts";
import Container from "../components/Container/Container";
import ProductCard from "../components/ProductCard/ProductCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import Certificates from "../components/home/Certificates/Certificates";
import { Link } from "@/i18n/navigation";
import "./Home.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return {
		title: `${t("home.title")} | ${t("company_name")}`,
		description: t("home.desc_seo"),
		alternates: {
			canonical: "https://www.yagodakarpat.com/uk/",
			languages: {
				uk: "https://www.yagodakarpat.com/uk/",
				en: "https://www.yagodakarpat.com/en/",
				cs: "https://www.yagodakarpat.com/cs/",
				"x-default": "https://www.yagodakarpat.com/uk/",
			},
		},
	};
}

export default async function Home() {
	const t = await getTranslations();

	return (
		<main>
			<Container>
				<section className="home-hero" id="home">
					<div className="home-hero-inner">
						<video
							className="home-container__video"
							loop
							autoPlay
							muted
							playsInline
						>
							<source src="/video-c.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
						<a
							className="home-container__video-author"
							href="https://www.pexels.com/@ksnblog/"
							target="_blank"
						>
							Sergey k
						</a>
						<p className="home-container__desc">{t("companyFullName")}</p>
						<h1 className="home-container__title">{t("home.title")}</h1>
						<h2 className="home-container__desc">{t("home.sec_title")}</h2>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
							<Link className="home-container__link" href="/#products">
								{t("home.viewProducts")}
							</Link>
							<Link className="home-container__link" href="/#contacts">
								{t("home.requestPriceList")}
							</Link>
						</div>
					</div>
				</section>
				<AboutUs productsData={productsData} />
				<section className="home-products" id="products">
					<SectionTitle name={t("products_title")} />
					<div className="products-container">
						{productsData.slice(0, 6).map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</div>
					<Link className="home-products__link" href="/products">
						{t("home.viewAllProducts")}
					</Link>
				</section>
				<Certificates />
				<Contacts />
			</Container>
		</main>
	);
}
