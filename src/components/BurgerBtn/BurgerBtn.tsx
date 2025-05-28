import "./BurgerBtn.scss";

const BurgerBtn = () => {
	function toggleBurgerBtn() {
		const burgerBtn = document.querySelector(
			".burger-btn"
		) as HTMLDivElement | null;
		const midLine = document.querySelector(
			".burger-btn__center-line"
		) as HTMLSpanElement | null;
		const navCurtain = document.querySelector(
			".nav-curtain"
		) as HTMLDivElement | null;
		const curtain = document.querySelector(".curtain") as HTMLDivElement | null;
		burgerBtn?.classList.toggle("burger-btn--active");
		midLine?.classList.toggle("burger-btn__center-line--active");
		navCurtain?.classList.toggle("nav-curtain--active");
		curtain?.classList.toggle("curtain--active");
		// hide list of products in menu by clicking menu btn

		const navCurtainGridDd = document.querySelector(
			".nav-curtain__grid-dropdown"
		) as HTMLDivElement | null;
		const productsBtn = document.querySelector(".products-btn");
		const productsBtnIcon = document.querySelector(".products-btn__icon");

		navCurtainGridDd?.classList.remove("nav-curtain__grid-dropdown--active");
		productsBtn?.classList.remove("products-btn--active");
		productsBtnIcon?.classList.remove("products-btn__icon--active");
		// document.body.classList.toggle("body--hidden");
	}

	return (
		<div onClick={toggleBurgerBtn} className="burger-btn__wrapper">
			<div className="burger-btn">
				<span className="burger-btn__center-line"></span>
			</div>
		</div>
	);
};

export default BurgerBtn;
