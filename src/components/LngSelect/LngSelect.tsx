import { useEffect } from "react";
import i18n from "i18next";
import "./LngSelect.scss";

const LngSelect = () => {
	const getStorage = () => {
		return localStorage.getItem("i18nextLng") || "uk";
	};

	useEffect(() => {
		const handleLanguage = (lng: string) => {
			i18n.changeLanguage(lng);
			getStorage();
		};

		const selectBtn = document.querySelector(
			".lng-select__btn"
		) as HTMLButtonElement | null;
		const langSelectOptions = document.querySelectorAll(
			".lng-select__option"
		) as NodeListOf<HTMLLIElement>;

		selectBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			const lngSelectDd = document.querySelector(
				".lng-select__dd"
			) as HTMLUListElement | null;
			const selectBtn = document.querySelector(
				".lng-select__btn"
			) as HTMLButtonElement | null;
			lngSelectDd?.classList.toggle("lng-select__dd--active");
			selectBtn?.classList.toggle("lng-select__btn--active");
			console.log(1);
		});

		langSelectOptions.forEach((option) => {
			if (option.dataset.value === getStorage()) {
				option.classList.add("lng-select__option--active");
			}
			option.addEventListener("click", (e) => {
				e.stopPropagation();
				for (let i = 0; i < langSelectOptions.length; i++) {
					langSelectOptions[i].classList.remove("lng-select__option--active");
				}
				if (!selectBtn) return;
				selectBtn.innerHTML = option.innerHTML;
				const optionDatasetValue = option.dataset.value?.toString();
				if (optionDatasetValue) {
					handleLanguage(optionDatasetValue);
				}
				selectBtn.classList.remove("lng-select__btn--active");
				const lngSelectDd = document.querySelector(
					".lng-select__dd"
				) as HTMLUListElement | null;
				lngSelectDd?.classList.remove("lng-select__dd--active");
				if (option.dataset.value === getStorage()) {
					option.classList.add("lng-select__option--active");
				}
			});
		});

		document.addEventListener("scroll", () => {
			const lngSelectDd = document.querySelector(
				".lng-select__dd"
			) as HTMLUListElement | null;
			lngSelectDd?.classList.remove("lng-select__dd--active");
			selectBtn?.classList.remove("lng-select__btn--active");
		});

		document.addEventListener("click", (e) => {
			if (e.target !== selectBtn) {
				const lngSelectDd = document.querySelector(
					".lng-select__dd"
				) as HTMLUListElement | null;
				lngSelectDd?.classList.remove("lng-select__dd--active");
				selectBtn?.classList.remove("lng-select__btn--active");
			}
		});

		const handlelngSelectBtnTxt = (code = "UA", name = "Українська") => {
			return `<span>${code}</span><span> - </span><span>${name}</span>`;
		};

		const lngSelectBtn = document.querySelector(".lng-select__btn");

		if (!lngSelectBtn) return;

		switch (getStorage()) {
			case "uk":
				lngSelectBtn.innerHTML = handlelngSelectBtnTxt("UA", "Українська");
				break;
			case "en":
				lngSelectBtn.innerHTML = handlelngSelectBtnTxt("EN", "English");
				break;
			case "cs":
				lngSelectBtn.innerHTML = handlelngSelectBtnTxt("CZ", "Čeština");
				break;
		}

		return () => {
			selectBtn?.removeEventListener("click", (e) => {
				e.preventDefault();
				const lngSelectDd = document.querySelector(
					".lng-select__dd"
				) as HTMLUListElement | null;
				const selectBtn = document.querySelector(
					".lng-select__btn"
				) as HTMLButtonElement | null;
				lngSelectDd?.classList.toggle("lng-select__dd--active");
				selectBtn?.classList.toggle("lng-select__btn--active");
			});
		};
	}, []);

	return (
		<div className="lng-select">
			<button className="lng-select__btn">
				<span>UA</span>
				<span> - </span>
				<span>Українська</span>
			</button>
			<ul className="lng-select__dd">
				<li className="lng-select__option" data-value="uk">
					<span>UA</span>
					<span> - </span>
					<span>Українська</span>
				</li>
				<li className="lng-select__option" data-value="en">
					<span>EN</span>
					<span> - </span>
					<span>English</span>
				</li>
				<li className="lng-select__option" data-value="cs">
					<span>CZ</span>
					<span> - </span>
					<span>Čeština</span>
				</li>
			</ul>
		</div>
	);
};

export default LngSelect;
