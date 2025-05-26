import BurgerBtn from "../BurgerBtn/BurgerBtn";
import LngSelect from "../LngSelect/LngSelect";
import { NavLink } from "react-router-dom";
import logo from "/logo-img/yagoda-karpat-logo.svg";
import "./Header.scss";

const Header = () => {
	let lastScrollTop = 0;
	addEventListener("scroll", () => {
		let scrollTop = document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop && scrollTop > window.innerHeight) {
			document.querySelector(".header").classList.add("header--hide");
		} else {
			document.querySelector(".header").classList.remove("header--hide");
		}
		lastScrollTop = scrollTop;
	});

	return (
		<header className="header">
			<NavLink to={"/"} className="header__logo">
				<img width={30} src={logo} alt="" />
				<span>Ягода Карпат</span>
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
