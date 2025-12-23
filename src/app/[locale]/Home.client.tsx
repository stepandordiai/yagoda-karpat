"use client";

import { Product } from "../interfaces/Product";
import classNames from "classnames";
import AboutUs from "../components/AboutUs/AboutUs";
import Contacts from "../components/Contacts/Contacts";
import Container from "../components/Container/Container";
import ProductCard from "../components/ProductCard/ProductCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import Certificates from "../components/Certificates/Certificates";
import { useState } from "react";
// TODO:
// import { Link } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import "./Home.scss";

type HomeClientProps = {
	productsData: Product[];
	locale: string;
};

const HomeClient = ({ productsData, locale }: HomeClientProps) => {
	const t = useTranslations();

	const [isLoaded, setIsLoaded] = useState(false);

	const handleVideo = () => setIsLoaded(true);

	return (
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
							// preload="metadata"
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
						<p className="home-container__desc">{t("company_full_name")}</p>
						<h1 className="home-container__title">{t("home.title")}</h1>
						<h2 className="home-container__desc">{t("home.sec_title")}</h2>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
							<Link className="home-container__link" href={`/#products`}>
								{t("home.viewProducts")}
							</Link>
							<Link className="home-container__link" href={`/#contacts`}>
								{t("home.requestPriceList")}
							</Link>
						</div>
					</div>
				</section>
				<AboutUs productsData={productsData} />
				<section className="home-products" id="products">
					<SectionTitle name={t("products_title")} />
					<div className="products-container">
						{/* TODO: slice() method returns new array */}
						{productsData.slice(0, 6).map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</div>
					{/* <Link className="home-products__link" href="/products">
						{t("home.viewAllProducts")}
					</Link> */}
					<Link href={"/products"}>Products</Link>
				</section>
				<Certificates />
				<Contacts />
			</Container>
		</main>
	);
};

export default HomeClient;
