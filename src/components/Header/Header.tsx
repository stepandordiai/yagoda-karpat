import { useTranslation } from "react-i18next";
import LngSelect from "../LngSelect/LngSelect";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import Container from "../Container/Container";
import logo from "/logo-img/yagoda-karpat-logo.svg";
import plusIcon from "/icons/plus.png";
import "./Header.scss";

interface HeaderData {
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

type HeaderProps = {
	productsData: HeaderData[];
};

const Header: React.FC<HeaderProps> = ({ productsData }) => {
	const { t } = useTranslation();
	const { lng } = useParams();
	const { pathname } = useLocation();

	const [isActive, setIsActive] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const uniqueProductTypes = [
		...new Set(productsData.map((product) => product.type)),
	];

	function toggleBurgerBtn(): void {
		setIsActive((prev) => !prev);

		// hide list of products in menu by clicking menu btn
		setIsDropdownOpen((prev) => (prev ? false : prev));
	}

	const closeMenu = () => {
		setIsActive(false);
		setIsDropdownOpen((prev) => (prev ? false : prev));
	};

	useEffect(() => {
		document.body.classList.toggle("body--hidden", isActive);
	}, [isActive]);

	// menu

	function toggleDropdownBtn(): void {
		setIsDropdownOpen((prev) => !prev);
	}

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
		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeMenu();
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => {
			document.removeEventListener("keydown", closeMenuOnEsc);
		};
	}, []);

	return (
		<>
			<header className="header">
				<Container>
					<div className="header-inner">
						<NavLink to={`/${lng}`} className="header__logo">
							<img width={30} src={logo} alt="Yagoda Karpat logo" />
							<span>{t("company_name")}</span>
						</NavLink>
						<LngSelect />
						<a className="header__tel" href="tel:+380968065513">
							+38 096 806 55 13
						</a>

						{/* burger-btn */}

						<button onClick={toggleBurgerBtn} className="burger-btn">
							<span
								className={`burger-btn-inner ${
									isActive ? "burger-btn-inner--active" : ""
								}`}
							>
								<span
									className={`burger-btn-inner__center-line ${
										isActive ? "burger-btn-inner__center-line--active" : ""
									}`}
								></span>
							</span>
						</button>
					</div>
				</Container>
			</header>

			{/* menu */}

			<div className={`menu ${isActive ? "menu--active" : ""}`}>
				<ul className="menu__list">
					<li>
						<HashLink
							onClick={closeMenu}
							className="link link--active"
							smooth
							to={`/${lng}/#home`}
						>
							{t("home_title")}
						</HashLink>
					</li>
					<li>
						<HashLink
							onClick={closeMenu}
							className="link"
							smooth
							to={`/${lng}/#about-us`}
						>
							{t("about_us_title")}
						</HashLink>
					</li>
					<li>
						<div className="menu__products-link">
							<HashLink
								onClick={closeMenu}
								className="link"
								smooth
								to={`/${lng}/#products`}
							>
								{t("products_title")}
							</HashLink>
							<button
								className={`products-btn ${
									isDropdownOpen ? "products-btn--active" : ""
								}`}
								onClick={toggleDropdownBtn}
							>
								<span
									className={`products-btn__icon ${
										isDropdownOpen ? "products-btn__icon--active" : ""
									}`}
								>
									<img src={plusIcon} width={25} height={25} alt="" />
								</span>
							</button>
						</div>
						<div
							className={`menu__grid-dropdown ${
								isDropdownOpen ? "menu__grid-dropdown--active" : ""
							}`}
						>
							<div className="menu__dropdown">
								<div className="menu__inner-dd">
									{uniqueProductTypes.map((productType) => {
										return (
											<div key={productType}>
												<p className="menu__sec-title">{t(productType)}</p>
												<ul className="menu__products-list">
													{productsData
														.filter((product) => product.type === productType)
														.map(({ id, name }) => {
															return (
																<li key={id}>
																	<NavLink
																		onClick={closeMenu}
																		className={({ isActive }) =>
																			isActive ? "product-link--active" : ""
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
										);
									})}
								</div>
							</div>
						</div>
					</li>
					<li>
						<HashLink
							onClick={closeMenu}
							className="link"
							smooth
							to={`/${lng}/#contacts`}
						>
							{t("contacts_title")}
						</HashLink>
					</li>
				</ul>
				<div className="menu__footer">
					<a className="menu__footer-link" href="tel:+380968065513">
						+38 (096) 806 55 13
					</a>
					<a className="menu__footer-link" href="mailto:info@yagodakarpat.com">
						info@yagodakarpat.com
					</a>
				</div>
			</div>

			{/* menu-curtain */}

			<div
				className={`menu-curtain ${isActive ? "menu-curtain--active" : ""}`}
			></div>
		</>
	);
};

export default Header;
