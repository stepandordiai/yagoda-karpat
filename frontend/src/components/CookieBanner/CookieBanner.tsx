"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import classNames from "classnames";
import "./styles.scss";

export default function CookieBanner() {
	const t = useTranslations();

	const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("cookieBanner") === "hidden") return;
		const timeout = setTimeout(() => {
			setCookieBannerVisible(true);
		}, 2000);

		return () => clearTimeout(timeout);
	}, []);

	const handleCookieBanner = () => {
		setCookieBannerVisible(false);
		localStorage.setItem("cookieBanner", "hidden");
	};

	return (
		<div
			className={classNames("cookie-banner", {
				"cookie-banner--visible": cookieBannerVisible,
			})}
		>
			<p className="cookie-banner__title">
				<Image src="/cookie.png" width={30} height={30} alt="cookie icon" />
				<span>{t("cookieBanner.title")}</span>
			</p>
			<p>{t("cookieBanner.description")}</p>
			<div className="cookie-banner__btn-container">
				<button onClick={handleCookieBanner} className="cookie-banner__sec-btn">
					{t("cookieBanner.rejectAll")}
				</button>
				<button
					onClick={handleCookieBanner}
					className="cookie-banner__primary-btn"
				>
					{t("cookieBanner.acceptAll")}
				</button>
			</div>
		</div>
	);
}
