"use client";

import { Product } from "@/app/interfaces/Product";
import { useState, useEffect } from "react";
import LngSelect from "../../common/LngSelect/LngSelect";
import Container from "../../Container/Container";
import classNames from "classnames";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import TelIcon from "@/app/icons/TelIcon";
import EmailIcon from "@/app/icons/EmailIcon";
import PdfIcon from "@/app/icons/PdfIcon";
import "./Header.scss";

type HeaderProps = {
	productsData: Product[];
};

export default function Header({ productsData }: HeaderProps) {
	const t = useTranslations();
	const pathname = usePathname();

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
						<a
							className="header__catalog"
							href="/pdf/yagoda-karpat-catalog.pdf"
							target="_blank"
						>
							<span>Catalog</span>
							<span
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<PdfIcon />
							</span>
						</a>
						<LngSelect />
						<a className="header__tel" href="tel:+380968065513">
							<span>+38 096 806 55 13</span>
							<span>
								<TelIcon />
							</span>
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
						<Link
							onClick={closeMenu}
							className={classNames("link", {
								"link--active": pathname === "/",
							})}
							href="/"
						>
							{t("home_title")}
						</Link>
					</li>
					<li>
						<Link onClick={closeMenu} className="link" href="/#about-us">
							{t("about_us_title")}
						</Link>
					</li>
					<li>
						<div className="menu__products-link">
							<Link
								onClick={closeMenu}
								className={classNames("link", {
									"link--active": pathname === "/products",
								})}
								href="/products"
							>
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
									<img src="/icons/plus-lg.svg" width={24} height={24} alt="" />
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
																		className={classNames({
																			"product-link--active":
																				pathname === `/products/${id}`,
																		})}
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
						<Link onClick={closeMenu} className="link" href="/#contacts">
							{t("contacts_title")}
						</Link>
					</li>
				</ul>
				<div className="menu__footer">
					<a className="menu__footer-link" href="tel:+380968065513">
						<TelIcon size={24} />
						<span>+38 (096) 806 55 13</span>
					</a>
					<a className="menu__footer-link" href="mailto:info@yagodakarpat.com">
						<EmailIcon size={24} />
						<span>info@yagodakarpat.com</span>
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
}
