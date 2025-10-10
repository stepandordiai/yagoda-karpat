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

	// TODO:
	const uniqueProductTypes = [
		...new Set(productsData.map((product) => product.type)),
	];

	const inactiveLink = "js-link";
	const activeLink = "js-link product-link--active";

	// useEffect(() => {
	// 	let lastScrollTop = 0;

	// 	function handleHeaderOnScroll(): void {
	// 		const header = document.querySelector(".header") as HTMLElement | null;
	// 		let scrollTop = document.documentElement.scrollTop;
	// 		if (scrollTop > lastScrollTop && scrollTop > window.innerHeight) {
	// 			header?.classList.add("header--hide");
	// 		} else {
	// 			header?.classList.remove("header--hide");
	// 		}
	// 		lastScrollTop = scrollTop;
	// 	}

	// 	document.addEventListener("scroll", handleHeaderOnScroll);

	// 	return () => {
	// 		document.removeEventListener("scroll", handleHeaderOnScroll);
	// 	};
	// }, []);

	function toggleBurgerBtn(): void {
		setIsActive((prev) => !prev);

		// hide list of products in menu by clicking menu btn
		setIsDropdownOpen(false);
	}

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
		document.querySelectorAll(".js-link").forEach((link) => {
			link.addEventListener("click", () => {
				setIsDropdownOpen(false);
				setIsActive(false);
			});
		});
	}, []);

	return (
		<>
			<header className="header">
				<Container>
					<div className="header-inner">
						<NavLink to={`/${lng}`} className="header__logo">
							<img width={30} src={logo} alt="Yagoda Karpat Logo" />
							<span>{t("company_name")}</span>
						</NavLink>
						<LngSelect />
						<a className="header__tel" href="tel:+380968065513">
							+38 096 806 55 13
						</a>

						{/* burger-btn */}

						<button onClick={toggleBurgerBtn} className="burger-btn">
							<span
								className={
									isActive
										? "burger-btn-inner burger-btn-inner--active"
										: "burger-btn-inner"
								}
							>
								<span
									className={
										isActive
											? "burger-btn-inner__center-line burger-btn-inner__center-line--active"
											: "burger-btn-inner__center-line"
									}
								></span>
							</span>
						</button>
					</div>
				</Container>
			</header>

			{/* menu */}

			<div className={isActive ? "menu menu--active" : "menu"}>
				<ul className="menu__list">
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
						<div className="menu__products-link">
							<HashLink
								className="link js-link"
								smooth
								to={`/${lng}/#products`}
							>
								{t("products_title")}
							</HashLink>
							<button
								className={
									isDropdownOpen
										? "products-btn products-btn--active"
										: "products-btn"
								}
								onClick={toggleDropdownBtn}
							>
								<span
									className={
										isDropdownOpen
											? "products-btn__icon products-btn__icon--active"
											: "products-btn__icon"
									}
								>
									<img src={plusIcon} width={25} height={25} alt="" />
								</span>
							</button>
						</div>
						<div
							className={
								isDropdownOpen
									? "menu__grid-dropdown menu__grid-dropdown--active"
									: "menu__grid-dropdown"
							}
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
										);
									})}
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
				className={
					isActive ? "menu-curtain menu-curtain--active" : "menu-curtain"
				}
			></div>
		</>
	);
};

export default Header;
