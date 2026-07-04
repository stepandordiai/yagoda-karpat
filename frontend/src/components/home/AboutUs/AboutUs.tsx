import { getTranslations } from "next-intl/server";
import Gallery from "@/components/Gallery/Gallery";
import AboutUsClient from "./AboutUsClient";
import WorldMap from "@/components/WorldMap/WorldMap";
import "./AboutUs.scss";

type AboutUsProps = {
	productsLength: number;
};

export default async function AboutUs({ productsLength }: AboutUsProps) {
	const t = await getTranslations();

	return (
		<section className="about-us js-about-us" id="about-us">
			<h2 className="section-title">{t("about_us_title")}</h2>
			<div className="about-us-container">
				{t.raw("about_us.description").map((paragraph: string, i: number) => {
					return <p key={i}>{paragraph}</p>;
				})}
				<AboutUsClient productsLength={productsLength} />
			</div>
			<Gallery />
			<h3 className="world-map__title">{t("about_us.map_title")}</h3>
			<WorldMap />
		</section>
	);
}
