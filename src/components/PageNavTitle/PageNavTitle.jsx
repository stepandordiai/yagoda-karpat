import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import "./PageNavTitle.scss";

const PageNavTitle = ({ title, previousTitle, homeTitle }) => {
	const { t } = useTranslation();

	return (
		<div className="page-nav-title">
			<HashLink className="page-nav-title__link" smooth to={"/#home"}>
				{homeTitle}
			</HashLink>
			<span>/</span>
			<HashLink className="page-nav-title__link" smooth to={"/#products"}>
				{previousTitle}
			</HashLink>
			<span>/</span>
			<span>{t(title)}</span>
		</div>
	);
};

export default PageNavTitle;
