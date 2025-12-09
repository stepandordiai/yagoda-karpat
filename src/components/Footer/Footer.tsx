import { Product } from "../../interfaces/Product";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Container from "../Container/Container";
import linksData from "./../../assets/data/links-data.json";
import classNames from "classnames";
import arrowUpIcon from "/icons/arrow-up.svg";
import plusIcon from "/icons/plus-lg.svg";
import logo from "/logo-img/yagoda-karpat-logo.svg";
import facebookLogo from "/icons/facebook.svg";
import linkedinLogo from "/icons/linkedin.svg";
import "./Footer.scss";

interface Social {
	title: string;
	url: string;
	img: string;
}

const socialsData: Social[] = [
	{
		title: "Facebook",
		url: "https://www.facebook.com/profile.php?id=61584019674019",
		img: facebookLogo,
	},
	{
		title: "LinkedIn",
		url: "https://www.linkedin.com/company/yagoda-karpat",
		img: linkedinLogo,
	},
];

type FooterProps = {
	productsData: Product[];
};

const Footer: React.FC<FooterProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { lng } = useParams();

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
						<img src={arrowUpIcon} width={26} height={26} alt="" />
					</button>
					<div className="footer-details">
						<NavLink className="footer-logo" to={`/${lng}/`}>
							<img src={logo} width={50} alt="Yagoda Karpat logo" />
							<span>{t("company_name")}</span>
						</NavLink>
						<div className="footer__socials">
							{socialsData.map(({ title, url, img }, i) => {
								return (
									<a key={i} href={url} target="_blank" title={title}>
										<img src={img} width={24} height={24} alt="" />
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
										src={plusIcon}
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
											{linksData.map((link) => {
												return (
													<li key={link.id}>
														<HashLink
															onClick={closeFooterDropdown}
															smooth
															to={`/${lng}${link.path}`}
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
												src={plusIcon}
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
																	<NavLink
																		onClick={closeFooterDropdown}
																		className={({ isActive }) =>
																			classNames("footer__product-link", {
																				"footer__product-link--active":
																					isActive,
																			})
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
