"use client";

import { Product } from "../../interfaces/Product";
import { useState, useEffect } from "react";
import LngSelect from "../LngSelect/LngSelect";
import Container from "../Container/Container";
import classNames from "classnames";
import { Link } from "@/i18n/navigation";
import "./Header.scss";
import { useTranslations } from "next-intl";

type HeaderProps = {
	productsData: Product[];
};

const Header: React.FC<HeaderProps> = ({ productsData }) => {
	const t = useTranslations();

	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const uniqueProductTypes = [
		...new Set(productsData.map((product) => product.type)),
	];

	function toggleMenu(): void {
		setIsMenuVisible((prev) => !prev);
		setIsDropdownOpen((prev) => (prev ? false : prev));
	}

	const closeMenu = () => {
		setIsMenuVisible(false);
		setIsDropdownOpen(false);
	};

	useEffect(() => {
		document.body.classList.toggle("body--hidden", isMenuVisible);
	}, [isMenuVisible]);

	// menu
	function toggleDropdownBtn(): void {
		setIsDropdownOpen((prev) => !prev);
	}

	// FIXME:
	// function handleNavIndicator(
	// 	sections: (HTMLElement | null)[],
	// 	links: NodeListOf<HTMLElement>
	// ): void {
	// 	links.forEach((link) => link.classList.remove("link--active"));

	// 	sections.forEach((section, index) => {
	// 		if (!section) return;

	// 		const rect = section.getBoundingClientRect();
	// 		if (rect.top <= 40 && rect.bottom >= 40) {
	// 			links[index].classList.add("link--active");
	// 		}
	// 	});
	// }

	// FIXME:
	// useEffect(() => {
	// 	const links = document.querySelectorAll(".link") as NodeListOf<HTMLElement>;
	// 	const sections = [
	// 		document.querySelector(".js-home") as HTMLDivElement | null,
	// 		document.querySelector(".js-about-us") as HTMLDivElement | null,
	// 		document.querySelector(".js-products") as HTMLDivElement | null,
	// 		document.querySelector(".js-contacts") as HTMLDivElement | null,
	// 	];

	// 	// Remove indicators when navigate to another page
	// 	links.forEach((link) => link.classList.remove("link--active"));

	// 	if (!links.length || !sections.some(Boolean)) return;

	// 	const onScroll = () => handleNavIndicator(sections, links);

	// 	// Update indicator when navigate
	// 	onScroll();

	// 	document.addEventListener("scroll", onScroll);

	// 	// Cleanup
	// 	return () => {
	// 		document.removeEventListener("scroll", onScroll);
	// 	};
	// }, [pathname]);

	// Close menu on Esc
	useEffect(() => {
		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeMenu();
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => document.removeEventListener("keydown", closeMenuOnEsc);
	}, []);

	return (
		<>
			<header className="header">
				<Container>
					<div className="header-inner">
						<Link href="/" className="header__logo">
							<img
								width={30}
								src="/logo-img/yagoda-karpat-logo.svg"
								alt="Yagoda Karpat logo"
							/>
							<span>{t("company_name")}</span>
						</Link>
						<LngSelect />
						<a className="header__tel" href="tel:+380968065513">
							+38 096 806 55 13
						</a>
						{/* menu-btn */}
						<button
							onClick={toggleMenu}
							className="burger-btn"
							aria-label={
								isMenuVisible ? t("header.closeMenu") : t("header.openMenu")
							}
							aria-expanded={isMenuVisible}
							aria-controls="menu"
						>
							<span
								className={classNames("burger-btn-inner", {
									"burger-btn-inner--active": isMenuVisible,
								})}
							>
								<span
									className={classNames("burger-btn-inner__center-line", {
										"burger-btn-inner__center-line--active": isMenuVisible,
									})}
								></span>
							</span>
						</button>
					</div>
				</Container>
			</header>
			{/* menu */}
			<nav
				className={classNames("menu", {
					"menu--active": isMenuVisible,
				})}
				id="menu"
				hidden={!isMenuVisible}
			>
				<ul className="menu__list">
					<li>
						<a onClick={closeMenu} className="link link--active" href="/">
							{t("home_title")}
						</a>
					</li>
					<li>
						<a onClick={closeMenu} className="link" href="#about-us">
							{t("about_us_title")}
						</a>
					</li>
					<li>
						<div className="menu__products-link">
							<Link onClick={closeMenu} className="link" href="/products">
								{t("products_title")}
							</Link>
							<button
								className={classNames("products-btn", {
									"products-btn--active": isDropdownOpen,
								})}
								onClick={toggleDropdownBtn}
								aria-expanded={isDropdownOpen}
								aria-controls="menu-dropdown"
							>
								<span
									className={classNames("products-btn__icon", {
										"products-btn__icon--active": isDropdownOpen,
									})}
								>
									<img src="/icons/plus-lg.svg" width={25} height={25} alt="" />
								</span>
							</button>
						</div>
						<div
							className={classNames("menu__grid-dropdown", {
								"menu__grid-dropdown--active": isDropdownOpen,
							})}
							id="menu-dropdown"
							hidden={!isDropdownOpen}
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
																	<Link
																		onClick={closeMenu}
																		// className={({ isActive }) =>
																		// 	classNames({
																		// 		"product-link--active": isActive,
																		// 	})
																		// }
																		href={`/products/${id}`}
																	>
																		{t(name)}
																	</Link>
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
						<a onClick={closeMenu} className="link" href="#contacts">
							{t("contacts_title")}
						</a>
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
			</nav>
			{/* menu-curtain */}
			<div
				className={classNames("menu-curtain", {
					"menu-curtain--active": isMenuVisible,
				})}
			></div>
		</>
	);
};

export default Header;
