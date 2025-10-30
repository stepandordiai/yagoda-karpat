import { useEffect, useRef, useState } from "react";
import i18n from "i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import lngData from "./../../assets/data/lng-data.json";
import getStorage from "../../utils/getStorage";
import "./LngSelect.scss";

const LngSelect = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const lngSelect = useRef<HTMLDivElement | null>(null);

	const [lngSelectBtn, setLngSelectBtn] = useState(false);
	const [lngSelectOption, setLngSelectOption] = useState(getStorage());
	const [lngSelectName, setLngSelectName] = useState("UA");
	const [lngSelectFullname, setLngSelectFullname] = useState("Українська");

	useEffect(() => {
		const storedLng = getStorage();
		const foundLng = lngData.find((lng) => lng.code === storedLng);

		setLngSelectName(foundLng ? foundLng.name : lngData[0].name);
		setLngSelectFullname(foundLng ? foundLng.fullName : lngData[0].fullName);

		// TODO:
		const newPath = location.pathname.replace(/^\/(uk|en)/, `/${storedLng}`);
		navigate(newPath + location.search, { replace: true });
	}, [getStorage()]);

	useEffect(() => {
		const handleClickNotOnLngSelect = (e: MouseEvent | TouchEvent) => {
			const targetElement = e.target as Node;
			if (lngSelect.current && !lngSelect.current.contains(targetElement)) {
				setLngSelectBtn(false);
			}
		};

		document.addEventListener("click", handleClickNotOnLngSelect);

		return () =>
			document.removeEventListener("click", handleClickNotOnLngSelect);
	}, []);

	const handleLngSelectBtn = () => {
		setLngSelectBtn((prev) => !prev);
	};

	const handleLngSelectOption = (code: string) => {
		i18n.changeLanguage(code);
		setLngSelectBtn(false);
		setLngSelectOption(code);
	};

	return (
		<div ref={lngSelect} className="lng-select">
			<button
				onClick={handleLngSelectBtn}
				className={`lng-select__btn ${
					lngSelectBtn ? "lng-select__btn--active" : ""
				}`}
			>
				<span>{lngSelectName}</span>
				<span> - </span>
				<span>{lngSelectFullname}</span>
			</button>
			<ul
				className={`lng-select__dd ${
					lngSelectBtn ? "lng-select__dd--active" : ""
				}`}
			>
				{lngData.map((lng) => {
					return (
						<li
							key={lng.code}
							onClick={() => handleLngSelectOption(lng.code)}
							className={`lng-select__option ${
								lngSelectOption === lng.code ? "lng-select__option--active" : ""
							}`}
						>
							<span>{lng.name}</span>
							<span> - </span>
							<span>{lng.fullName}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LngSelect;
