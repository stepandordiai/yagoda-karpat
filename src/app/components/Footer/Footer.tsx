"use client";

import { useTranslations } from "next-intl";
import { Product } from "../../interfaces/Product";
import { useState } from "react";
import { usePathname } from "@/i18n/navigation";
import Container from "../Container/Container";
import classNames from "classnames";
import { Link } from "@/i18n/navigation";
import FacebookIcon from "@/app/icons/FacebookIcon";
import LinkedinIcon from "@/app/icons/LinkedinIcon";
import "./Footer.scss";

interface Social {
	title: string;
	url: string;
	// TODO: LEARN THIS
	img: React.ReactNode;
}

const socialsData: Social[] = [
	{
		title: "Facebook",
		url: "https://www.facebook.com/profile.php?id=61584019674019",
		img: <FacebookIcon size={24} />,
	},
	{
		title: "LinkedIn",
		url: "https://www.linkedin.com/company/yagoda-karpat",
		img: <LinkedinIcon size={24} />,
	},
];

type FooterProps = {
	productsData: Product[];
};

export default function Footer({ productsData }: FooterProps) {
	const t = useTranslations();
	const pathname = usePathname();

	const uniqueProductTypes = [
		...new Set(productsData.map((product) => product.type)),
	];

	const [footerNavDropdownActive, setFooterNavDropdownActive] = useState(false);

	// TODO: learn this
	const [footerDropdownActive, setFooterDropdownActive] = useState<boolean[]>(
		() => new Array(uniqueProductTypes.length).fill(false)
	);

	const toggleFooterNavDropdown = () => {
		setFooterNavDropdownActive((prev) => !prev);
	};

	// TODO: learn this
	const toggleFooterDropdown = (index: number) => {
		setFooterDropdownActive((prev) => {
			const updated = [...prev];
			updated[index] = !updated[index];
			return updated;
		});
	};

	const closeFooterDropdown = () => {
		setFooterNavDropdownActive(false);
		setFooterDropdownActive((prev) => prev.map(() => false));
	};

	const scrollToTopOnClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="footer">
			<Container>
				<div className="footer-inner">
					<div className="footer-top"></div>
					<button
						className="to-top-btn"
						onClick={scrollToTopOnClick}
						aria-label={t("footer.scrollToTop")}
					>
						<img src="/icons/arrow-up.svg" width={26} height={26} alt="" />
					</button>
					<div className="footer-details">
						<Link className="footer-logo" href="/">
							<img
								src="/logo-img/yagoda-karpat-logo.svg"
								width={50}
								alt="Yagoda Karpat logo"
							/>
							<span>{t("company_name")}</span>
						</Link>
						<div className="footer__socials">
							{socialsData.map(({ title, url, img }, i) => {
								return (
									<a key={i} href={url} target="_blank" title={title}>
										{img}
									</a>
								);
							})}
						</div>
						<div className="footer-nav">
							<div>
								<button
									onClick={toggleFooterNavDropdown}
									className={classNames("footer-nav__title", "dropdown-btn", {
										"dropdown-btn--active": footerNavDropdownActive,
									})}
								>
									<span>{t("footer.navigation")}</span>
									<img
										className={classNames("dropdown-btn__icon", {
											"dropdown-btn__icon--active": footerNavDropdownActive,
										})}
										src="/icons/plus-lg.svg"
										width={26}
										height={26}
										alt=""
									/>
								</button>
								<div
									className={classNames("grid-dropdown__wrapper", {
										"grid-dropdown__wrapper--active": footerNavDropdownActive,
									})}
								>
									<div className="grid-dropdown">
										<ul className="footer-nav__list">
											<li>
												<Link onClick={closeFooterDropdown} href="/">
													{t("home_title")}
												</Link>
											</li>
											<li>
												<Link onClick={closeFooterDropdown} href="/#about-us">
													{t("about_us_title")}
												</Link>
											</li>
											<li>
												<Link onClick={closeFooterDropdown} href="/products">
													{t("products_title")}
												</Link>
											</li>
											<li>
												<Link onClick={closeFooterDropdown} href="/#contacts">
													{t("contacts_title")}
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							{uniqueProductTypes.map((productType, index) => {
								return (
									<div key={productType}>
										<button
											onClick={() => toggleFooterDropdown(index)}
											className={classNames(
												"footer-nav__title",
												"dropdown-btn",
												{
													"dropdown-btn--active": footerDropdownActive[index],
												}
											)}
										>
											<span>{t(productType)}</span>
											<img
												className={classNames("dropdown-btn__icon", {
													"dropdown-btn__icon--active":
														footerDropdownActive[index],
												})}
												src="/icons/plus-lg.svg"
												width={26}
												height={26}
												alt=""
											/>
										</button>
										<div
											className={classNames("grid-dropdown__wrapper", {
												"grid-dropdown__wrapper--active":
													footerDropdownActive[index],
											})}
										>
											<div className="grid-dropdown">
												<ul className="footer-nav__list">
													{productsData
														.filter((product) => {
															return product.type === productType;
														})
														.map(({ id, name }) => {
															return (
																<li key={id}>
																	<Link
																		onClick={closeFooterDropdown}
																		className={classNames(
																			"footer__product-link",
																			{
																				"footer__product-link--active":
																					pathname === `/products/${id}`,
																			}
																		)}
																		href={`/products/${id}`}
																	>
																		{t(name)}
																	</Link>
																</li>
															);
														})}
												</ul>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="footer__bottom">
							<div>
								<p>
									© 2010-{new Date().getFullYear()} {t("companyFullName")}
								</p>
								<p>{t("all_rights_reserved")}.</p>
							</div>
							<p>
								Made with love by{" "}
								<a
									className="creator-link"
									href="https://stepandordiai.netlify.app/"
									target="_blank"
								>
									STEPAN DORDIAI
								</a>
							</p>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
}
