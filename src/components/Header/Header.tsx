import { useTranslation } from "react-i18next";
import BurgerBtn from "../BurgerBtn/BurgerBtn";
import LngSelect from "../LngSelect/LngSelect";
import { NavLink, useParams } from "react-router-dom";
import logo from "/logo-img/yagoda-karpat-logo.svg";
import { useEffect } from "react";
import "./Header.scss";

const Header = () => {
	const { t } = useTranslation();

	const { lng } = useParams();

	useEffect(() => {
		let lastScrollTop = 0;

		function handleHeaderOnScroll(): void {
			const header = document.querySelector(".header") as HTMLElement | null;
			let scrollTop = document.documentElement.scrollTop;
			if (scrollTop > lastScrollTop && scrollTop > window.innerHeight) {
				header?.classList.add("header--hide");
			} else {
				header?.classList.remove("header--hide");
			}
			lastScrollTop = scrollTop;
		}

		document.addEventListener("scroll", handleHeaderOnScroll);

		return () => {
			document.removeEventListener("scroll", handleHeaderOnScroll);
		};
	}, []);

	return (
		<header className="header">
			<NavLink to={`/${lng}`} className="header__logo">
				<img width={30} src={logo} alt="" />
				<span>{t("company_name")}</span>
			</NavLink>
			<LngSelect />
			<a className="header__tel" href="tel:+380968065513">
				+38 096 806 55 13
			</a>
			<BurgerBtn />
		</header>
	);
};

export default Header;
