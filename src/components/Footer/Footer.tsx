import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Container from "../Container/Container";
import upArrowIcon from "/icons/up-arrow.png";
import plusIcon from "/icons/plus.png";
import logo from "/logo-img/yagoda-karpat-logo.svg";
import "./Footer.scss";

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

type FooterProps = {
	productsData: ProductsData[];
};

const Footer: React.FC<FooterProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const { lng } = useParams();

	const scrollToTop = () => {
		document.documentElement.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const dropdownBtnIcon = document.querySelectorAll(".dropdown-btn__icon");
		const gridDropdownWrapper = document.querySelectorAll(
			".grid-dropdown__wrapper"
		);
		const dropdownBtn = document.querySelectorAll(".dropdown-btn");

		document.querySelectorAll(".js-dropdown-btn").forEach((btn, index) => {
			btn.addEventListener("click", () => {
				gridDropdownWrapper[index].classList.toggle(
					"grid-dropdown__wrapper--active"
				);
				dropdownBtnIcon[index].classList.toggle("dropdown-btn__icon--active");
				dropdownBtn[index].classList.toggle("dropdown-btn--active");
			});
		});

		document.querySelectorAll(".js-footer__link").forEach((link) => {
			link.addEventListener("click", () => {
				gridDropdownWrapper.forEach((wrapper) => {
					wrapper.classList.remove("grid-dropdown__wrapper--active");
				});
				dropdownBtnIcon.forEach((icon) => {
					icon.classList.remove("dropdown-btn__icon--active");
				});
				dropdownBtn.forEach((btn) => {
					btn.classList.remove("dropdown-btn--active");
				});
			});
		});
	}, []);

	const uniqueProductTypes = [
		...new Set(productsData.map((product) => product.type)),
	];

	const inactiveFooterLink = "js-footer__link";
	const activeFooterLink = "js-footer__link footer__product-link--active";

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
							<img src={logo} width={50} alt="Yagoda Karpat Logo" />
							<span>{t("company_name")}</span>
						</NavLink>
						<div className="footer-nav">
							<div>
								<button className="footer-nav__title dropdown-btn js-dropdown-btn">
									<span>{t("footer.navigation")}</span>
									<img
										className="dropdown-btn__icon"
										src={plusIcon}
										width={25}
										height={25}
										alt=""
									/>
								</button>
								<div className="grid-dropdown__wrapper">
									<div className="grid-dropdown">
										<ul className="footer-nav__list">
											<li>
												<HashLink
													className="js-footer__link"
													smooth
													to={`/${lng}/#home`}
												>
													{t("home_title")}
												</HashLink>
											</li>
											<li>
												<HashLink
													className="js-footer__link"
													smooth
													to={`/${lng}/#about-us`}
												>
													{t("about_us_title")}
												</HashLink>
											</li>
											<li>
												<HashLink
													className="js-footer__link"
													smooth
													to={`/${lng}/#products`}
												>
													{t("products_title")}
												</HashLink>
											</li>
											<li>
												<HashLink
													className="js-footer__link"
													smooth
													to={`/${lng}/#contacts`}
												>
													{t("contacts_title")}
												</HashLink>
											</li>
										</ul>
									</div>
								</div>
							</div>
							{uniqueProductTypes.map((productType) => {
								return (
									<div key={productType}>
										<button className="footer-nav__title dropdown-btn js-dropdown-btn">
											<span>{t(productType)}</span>
											<img
												className="dropdown-btn__icon"
												src={plusIcon}
												width={25}
												height={25}
												alt=""
											/>
										</button>
										<div className="grid-dropdown__wrapper">
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
																		className={({ isActive }) =>
																			isActive
																				? activeFooterLink
																				: inactiveFooterLink
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
								{t("creator")}{" "}
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
