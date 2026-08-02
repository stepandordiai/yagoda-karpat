"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import classNames from "classnames";
import "./styles.scss";

export default function CookieBanner() {
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
				<Image src="/cookie.png" width={30} height={30} alt="cookie icon" />{" "}
				<span>We use cookies</span>
			</p>
			<p>
				We use cookies to keep this website running and to understand how
				visitors use it, so we can improve it. You can accept all cookies or
				continue with only the essential ones.
			</p>
			<div className="cookie-banner__btn-container">
				<button onClick={handleCookieBanner} className="cookie-banner__sec-btn">
					Reject all
				</button>
				<button
					onClick={handleCookieBanner}
					className="cookie-banner__primary-btn"
				>
					Accept all
				</button>
			</div>
		</div>
	);
}
