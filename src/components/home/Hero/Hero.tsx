import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import "./styles.scss";

const Hero = async () => {
	const t = await getTranslations();

	return (
		<>
			{/* TODO: learn this */}
			<link
				rel="preload"
				as="image"
				href="/hero-img-c.png"
				fetchPriority="high"
			/>
			<section className="home-hero" id="home">
				<div className="hero-container">
					<video
						className="home-container__video"
						loop
						autoPlay
						muted
						playsInline
						poster="/hero-img-c.png"
						// TODO: This video is decorative
						aria-hidden="true"
					>
						<source src="/video-c.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					<a
						className="home-container__video-author"
						href="https://www.pexels.com/@ksnblog/"
						target="_blank"
						// TODO: learn this
						rel="noopener noreferrer"
					>
						Sergey k
					</a>
					<p className="home-container__desc">{t("companyFullName")}</p>
					<h1 className="home-container__title">{t("home.title")}</h1>
					<h2 className="home-container__desc">{t("home.sec_title")}</h2>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
						<Link className="home-container__link btn--bold" href="/#products">
							{t("home.viewProducts")}
						</Link>
						<Link className="home-container__link btn--bold" href="/#contacts">
							{t("home.requestPriceList")}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
