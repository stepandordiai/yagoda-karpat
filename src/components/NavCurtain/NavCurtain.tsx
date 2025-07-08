import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import plusIcon from "/icons/plus.png";
import "./NavCurtain.scss";

interface ProductsData {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string[];
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

	const { lng } = useParams();

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
				const navCurtainGridDd = document.querySelector(
					".nav-curtain__grid-dropdown"
				) as HTMLDivElement | null;
				const productsBtn = document.querySelector(
					".products-btn"
				) as HTMLButtonElement | null;
				const productsBtnIcon = document.querySelector(
					".products-btn__icon"
				) as HTMLDivElement | null;
				burgerBtn?.classList.remove("burger-btn--active");
				midLine?.classList.remove("burger-btn__center-line--active");
				mobileMenu?.classList.remove("nav-curtain--active");
				const curtain = document.querySelector(
					".curtain"
				) as HTMLDivElement | null;
				curtain?.classList.remove("curtain--active");

				// hide list of products in menu by clicking menu btn
				navCurtainGridDd?.classList.remove(
					"nav-curtain__grid-dropdown--active"
				);
				productsBtn?.classList.remove("products-btn--active");
				productsBtnIcon?.classList.remove("products-btn__icon--active");
				document.body.classList.remove("body--hidden");
			});
		});
	}, []);

	function showProducts(): void {
		const navCurtainGridDd = document.querySelector(
			".nav-curtain__grid-dropdown"
		) as HTMLDivElement | null;
		const productsBtn = document.querySelector(
			".products-btn"
		) as HTMLButtonElement | null;
		const productsBtnIcon = document.querySelector(
			".products-btn__icon"
		) as HTMLDivElement | null;
		navCurtainGridDd?.classList.toggle("nav-curtain__grid-dropdown--active");
		productsBtn?.classList.toggle("products-btn--active");
		productsBtnIcon?.classList.toggle("products-btn__icon--active");
	}

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
							to={`/${lng}/#home`}
						>
							{t("home_title")}
						</HashLink>
					</li>
					<li>
						<HashLink className="link js-link" smooth to={`/${lng}/#about-us`}>
							{t("about_us_title")}
						</HashLink>
					</li>
					<li>
						<div className="nav-curtain__products-link">
							<HashLink
								className="link js-link"
								smooth
								to={`/${lng}/#products`}
							>
								{t("products_title")}
							</HashLink>
							<button className="products-btn" onClick={showProducts}>
								<div className="products-btn__icon">
									<img src={plusIcon} width={25} height={25} alt="" />
								</div>
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
																to={`/${lng}/product-page/${id}`}
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
																to={`/${lng}/product-page/${id}`}
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
																to={`/${lng}/product-page/${id}`}
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
																to={`/${lng}/product-page/${id}`}
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
						<HashLink className="link js-link" smooth to={`/${lng}/#contacts`}>
							{t("contacts_title")}
						</HashLink>
					</li>
				</ul>
			</div>
		</>
	);
};

export default NavCurtain;
