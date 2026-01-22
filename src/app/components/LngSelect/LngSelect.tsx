"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation"; // Використовуйте ваш файл routing
import classNames from "classnames";
import lngData from "./../../../lib/data/lng-data.json";
import "./LngSelect.scss";

const LngSelect = () => {
	const locale = useLocale(); // Отримуємо поточну мову (uk або en)
	const router = useRouter();
	const pathname = usePathname();
	const lngSelectRef = useRef<HTMLDivElement | null>(null);

	const [isVisible, setIsVisible] = useState(false);

	// Знаходимо дані поточної мови для відображення на кнопці
	const currentLng = lngData.find((lng) => lng.code === locale) || lngData[0];

	// Закриття дропдауну при кліку поза ним
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				lngSelectRef.current &&
				!lngSelectRef.current.contains(e.target as Node)
			) {
				setIsVisible(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const handleLanguageChange = (newLocale: string) => {
		setIsVisible(false);
		// next-intl сама оновить URL, зберігши поточний шлях
		// Наприклад: /uk/about -> /en/about
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<div ref={lngSelectRef} className="lng-select">
			<button
				onClick={() => setIsVisible(!isVisible)}
				className={classNames("lng-select__btn", {
					"lng-select__btn--active": isVisible,
				})}
			>
				<span>{currentLng.name}</span>
				<span> - </span>
				<span>{currentLng.fullName}</span>
			</button>

			<ul
				className={classNames("lng-select__dd", {
					"lng-select__dd--active": isVisible,
				})}
				hidden={!isVisible}
			>
				{lngData.map((lng) => (
					<li
						key={lng.code}
						onClick={() => handleLanguageChange(lng.code)}
						className={classNames("lng-select__option", {
							"lng-select__option--active": locale === lng.code,
						})}
					>
						<span>{lng.name}</span>
						<span> - </span>
						<span>{lng.fullName}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LngSelect;
