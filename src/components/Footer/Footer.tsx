import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Container from "../Container/Container";
import { Product } from "../../interfaces/Product";
import upArrowIcon from "/icons/up-arrow.png";
import plusIcon from "/icons/plus.png";
import logo from "/logo-img/yagoda-karpat-logo.svg";
import "./Footer.scss";

type FooterProps = {
	productsData: Product[];
};

const Footer: React.FC<FooterProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { lng } = useParams();

	const linksData = [
		{ id: 1, name: "home_title", path: `/${lng}/#home` },
		{ id: 2, name: "about_us_title", path: `/${lng}/#about-us` },
		{ id: 3, name: "products_title", path: `/${lng}/#products` },
		{ id: 4, name: "contacts_title", path: `/${lng}/#contacts` },
	];

	const uniqueProductTypes = [
		...new Set(productsData.map((product) => product.type)),
	];

	const [footerNavDropdownActive, setFooterNavDropdownActive] = useState(false);

	// TODO:
	const [footerDropdownActive, setFooterDropdownActive] = useState<boolean[]>(
		() => new Array(uniqueProductTypes.length).fill(false)
	);

	const toggleFooterNavDropdown = () => {
		setFooterNavDropdownActive((prev) => !prev);
	};

	const toggleFooterDropdown = (index: number) => {
		setFooterDropdownActive((prev) => {
			const updated = [...prev];
			updated[index] = !updated[index];
			return updated;
		});
	};

	const closeFooterDropdown = () => {
		setFooterNavDropdownActive((prev) => (prev ? false : prev));
		setFooterDropdownActive((prev) => prev.map(() => false));
	};

	const scrollToTop = () => {
		document.documentElement.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="footer">
			<Container>
				<div className="footer-inner">
					<div className="footer-top"></div>
					<button className="to-top-btn" onClick={scrollToTop}>
						<img src={upArrowIcon} width={25} height={25} alt="" />
					</button>
					<div className="footer-details">
						<NavLink className="footer-logo" to={`/${lng}/`}>
							<img src={logo} width={50} alt="Yagoda Karpat logo" />
							<span>{t("company_name")}</span>
						</NavLink>
						<div className="footer-nav">
							<div>
								<button
									onClick={toggleFooterNavDropdown}
									className={`footer-nav__title dropdown-btn ${
										footerNavDropdownActive ? "dropdown-btn--active" : ""
									}`}
								>
									<span>{t("footer.navigation")}</span>
									<img
										className={`dropdown-btn__icon ${
											footerNavDropdownActive
												? "dropdown-btn__icon--active"
												: ""
										}`}
										src={plusIcon}
										width={25}
										height={25}
										alt=""
									/>
								</button>
								<div
									className={`grid-dropdown__wrapper ${
										footerNavDropdownActive
											? "grid-dropdown__wrapper--active"
											: ""
									}`}
								>
									<div className="grid-dropdown">
										<ul className="footer-nav__list">
											{linksData.map((link) => {
												return (
													<li key={link.id}>
														<HashLink
															onClick={closeFooterDropdown}
															smooth
															to={link.path}
														>
															{t(link.name)}
														</HashLink>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
							{uniqueProductTypes.map((productType, index) => {
								return (
									<div key={productType}>
										<button
											onClick={() => toggleFooterDropdown(index)}
											className={`footer-nav__title dropdown-btn ${
												footerDropdownActive[index]
													? "dropdown-btn--active"
													: ""
											}`}
										>
											<span>{t(productType)}</span>
											<img
												className={`dropdown-btn__icon ${
													footerDropdownActive[index]
														? "dropdown-btn__icon--active"
														: ""
												}`}
												src={plusIcon}
												width={25}
												height={25}
												alt=""
											/>
										</button>
										<div
											className={`grid-dropdown__wrapper ${
												footerDropdownActive[index]
													? "grid-dropdown__wrapper--active"
													: ""
											}`}
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
																	<NavLink
																		onClick={closeFooterDropdown}
																		className={({ isActive }) =>
																			isActive
																				? "footer__product-link--active"
																				: ""
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
								);
							})}
						</div>
						<div className="footer__bottom">
							<div>
								<p>
									© 2010 - {new Date().getFullYear()} {t("company_full_name")}.
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
};

export default Footer;
