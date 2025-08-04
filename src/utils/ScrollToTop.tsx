import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (pathname && !hash) {
			window.scrollTo({
				top: 0,
				// behavior: "smooth",
			});
		}
	}, [pathname]);

	return null;
}
