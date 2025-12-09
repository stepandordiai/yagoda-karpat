import { useEffect, useRef, useState } from "react";
import i18n from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import lngData from "./../../assets/data/lng-data.json";
import getStorage from "../../utils/getStorage";
import classNames from "classnames";
import "./LngSelect.scss";

const LngSelect = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const lngSelect = useRef<HTMLDivElement | null>(null);

	const [lngSelectVisible, setLngSelectVisible] = useState(false);
	const [lngSelectOption, setLngSelectOption] = useState(getStorage());
	const [lngSelectName, setLngSelectName] = useState("UA");
	const [lngSelectFullname, setLngSelectFullname] = useState("Українська");

	useEffect(() => {
		const storedLng = getStorage();
		const foundLng = lngData.find((lng) => lng.code === storedLng);

		setLngSelectName(foundLng ? foundLng.name : lngData[0].name);
		setLngSelectFullname(foundLng ? foundLng.fullName : lngData[0].fullName);

		// TODO: learn this
		const newPath = location.pathname.replace(/^\/(uk|en)/, `/${storedLng}`);
		navigate(newPath + location.search, { replace: true });
	}, [getStorage()]);

	useEffect(() => {
		const handleClickNotOnLngSelect = (e: MouseEvent | TouchEvent) => {
			const targetElement = e.target as Node;
			if (lngSelect.current && !lngSelect.current.contains(targetElement)) {
				setLngSelectVisible(false);
			}
		};

		document.addEventListener("click", handleClickNotOnLngSelect);

		return () =>
			document.removeEventListener("click", handleClickNotOnLngSelect);
	}, []);

	const toggleLngSelect = (): void =>
		setLngSelectVisible((prev: boolean) => !prev);

	const handleLngSelectOption = (code: string) => {
		i18n.changeLanguage(code);
		setLngSelectVisible(false);
		setLngSelectOption(code);
	};

	return (
		<div ref={lngSelect} className="lng-select">
			<button
				onClick={toggleLngSelect}
				className={classNames("lng-select__btn", {
					"lng-select__btn--active": lngSelectVisible,
				})}
				aria-expanded={lngSelectVisible}
				aria-controls="lng-select-list"
			>
				<span>{lngSelectName}</span>
				<span> - </span>
				<span>{lngSelectFullname}</span>
			</button>
			<ul
				className={classNames("lng-select__dd", {
					"lng-select__dd--active": lngSelectVisible,
				})}
				id="lng-select-list"
				hidden={!lngSelectVisible}
			>
				{lngData.map((lng) => {
					return (
						<li
							key={lng.code}
							onClick={() => handleLngSelectOption(lng.code)}
							className={classNames("lng-select__option", {
								"lng-select__option--active": lngSelectOption === lng.code,
							})}
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
