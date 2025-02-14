import BurgerBtn from "../BurgerBtn/BurgerBtn";
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
            <a className="header__logo" href="#home">
                Ягода Карпат
            </a>
            <BurgerBtn />
        </header>
    );
};

export default Header;
