import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./NavCurtain.scss";

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

interface NavCurtainProps {
	productsData: ProductsData[];
}

const NavCurtain: React.FC<NavCurtainProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { pathname } = useLocation();

	function handleNavIndicator(
		sections: (HTMLElement | null)[],
		links: NodeListOf<HTMLElement>
	): void {
		links.forEach((link) => link.classList.remove("link--active"));

		sections.forEach((section, index) => {
			if (!section) return;

			const rect = section.getBoundingClientRect();
			if (rect.top <= 40 && rect.bottom >= 40) {
				links[index].classList.add("link--active");
			}
		});
	}

	useEffect(() => {
		const links = document.querySelectorAll(".link") as NodeListOf<HTMLElement>;
		const sections = [
			document.querySelector(".js-home") as HTMLDivElement | null,
			document.querySelector(".js-about-us") as HTMLDivElement | null,
			document.querySelector(".js-products") as HTMLDivElement | null,
			document.querySelector(".js-contacts") as HTMLDivElement | null,
		];

		// Remove indicators when navigate to another page
		links.forEach((link) => link.classList.remove("link--active"));

		if (!links.length || !sections.some(Boolean)) return;

		const onScroll = () => handleNavIndicator(sections, links);

		// Update indicator when navigate
		onScroll();

		document.addEventListener("scroll", onScroll);

		// Cleanup
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, [pathname]);

	function showProducts() {
		document
			.querySelector(".nav-curtain__grid-dropdown")
			.classList.toggle("nav-curtain__grid-dropdown--active");
		document
			.querySelector(".products-btn")
			.classList.toggle("products-btn--active");
		document
			.querySelector(".products-btn__icon")
			.classList.toggle("products-btn__icon--active");
	}

	useEffect(() => {
		document.querySelectorAll(".js-link").forEach((link) => {
			link.addEventListener("click", () => {
				const burgerBtn = document.querySelector(
					".burger-btn"
				) as HTMLDivElement | null;
				const midLine = document.querySelector(
					".burger-btn__center-line"
				) as HTMLDivElement | null;
				const mobileMenu = document.querySelector(
					".nav-curtain"
				) as HTMLDivElement | null;
				burgerBtn?.classList.remove("burger-btn--active");
				midLine?.classList.remove("burger-btn__center-line--active");
				mobileMenu?.classList.remove("nav-curtain--active");
				const curtain = document.querySelector(
					".curtain"
				) as HTMLDivElement | null;
				curtain?.classList.remove("curtain--active");

				// hide list of products in menu by clicking menu btn
				const navCurtainGridDd = document.querySelector(
					".nav-curtain__grid-dropdown"
				);

				navCurtainGridDd?.classList.remove(
					"nav-curtain__grid-dropdown--active"
				);
				const productsBtn = document.querySelector(".products-btn");

				productsBtn?.classList.remove("products-btn--active");
				const productsBtnIcon = document.querySelector(
					".products-btn__icon"
				) as HTMLDivElement | null;

				productsBtnIcon?.classList.remove("products-btn__icon--active");
				document.body.classList.remove("body--hidden");
			});
		});
	}, []);

	const inactiveLink = "js-link";
	const activeLink = "js-link product-link--active";

	return (
		<>
			<div className="curtain"></div>
			<div className="nav-curtain">
				<ul className="nav-curtain__list">
					<li>
						<HashLink
							className="link js-link link--active"
							smooth
							to={"/#home"}
						>
							{t("home_title")}
						</HashLink>
					</li>
					<li>
						<HashLink className="link js-link" smooth to={"/#about-us"}>
							{t("about_us_title")}
						</HashLink>
					</li>
					<li>
						<div className="nav-curtain__products-link">
							<HashLink className="link js-link" smooth to={"/#products"}>
								{t("products_title")}
							</HashLink>
							<button className="products-btn" onClick={showProducts}>
								<div className="products-btn__icon">+</div>
							</button>
						</div>
						<div className="nav-curtain__grid-dropdown">
							<div className="nav-curtain__dropdown">
								<div className="nav-curtain__inner-dd">
									<div>
										<p className="nav-curtain__sec-title">
											{t("berries_title")}
										</p>
										<ul className="nav-curtain__products-list">
											{productsData
												.filter((product) => product.type === "berry")
												.map(({ id, name }) => {
													return (
														<li key={id}>
															<NavLink
																className={({ isActive }) =>
																	isActive ? activeLink : inactiveLink
																}
																to={`/${id}`}
															>
																{t(name)}
															</NavLink>
														</li>
													);
												})}
										</ul>
									</div>
									<div>
										<p className="nav-curtain__sec-title">
											{t("fruits_title")}
										</p>
										<ul className="nav-curtain__products-list">
											{productsData
												.filter((product) => product.type === "fruit")
												.map(({ id, name }) => {
													return (
														<li key={id}>
															<NavLink
																className={({ isActive }) =>
																	isActive ? activeLink : inactiveLink
																}
																to={`/${id}`}
															>
																{t(name)}
															</NavLink>
														</li>
													);
												})}
										</ul>
									</div>
									<div>
										<p className="nav-curtain__sec-title">
											{t("mushrooms_title")}
										</p>
										<ul className="nav-curtain__products-list">
											{productsData
												.filter((product) => product.type === "mushroom")
												.map(({ id, name }) => {
													return (
														<li key={id}>
															<NavLink
																className={({ isActive }) =>
																	isActive ? activeLink : inactiveLink
																}
																to={`/${id}`}
															>
																{t(name)}
															</NavLink>
														</li>
													);
												})}
										</ul>
									</div>
									<div>
										<p className="nav-curtain__sec-title">
											{t("vegetables_title")}
										</p>
										<ul className="nav-curtain__products-list">
											{productsData
												.filter((product) => product.type === "vegetable")
												.map(({ id, name }) => {
													return (
														<li key={id}>
															<NavLink
																className={({ isActive }) =>
																	isActive ? activeLink : inactiveLink
																}
																to={`/${id}`}
															>
																{t(name)}
															</NavLink>
														</li>
													);
												})}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<HashLink className="link js-link" smooth to={"/#contacts"}>
							{t("contacts_title")}
						</HashLink>
					</li>
				</ul>
			</div>
		</>
	);
};

export default NavCurtain;
