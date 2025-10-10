import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import "./PageNavTitle.scss";

type PageNavTitleProps = {
	title: string;
	previousTitle: string;
	homeTitle: string;
};

const PageNavTitle = ({
	title,
	previousTitle,
	homeTitle,
}: PageNavTitleProps) => {
	const { t } = useTranslation();

	return (
		<div className="page-nav-title">
			<NavLink className="page-nav-title__link" to="/">
				{homeTitle}
			</NavLink>
			<span>/</span>
			<HashLink className="page-nav-title__link" smooth to="/#products">
				{previousTitle}
			</HashLink>
			<span>/</span>
			<span>{t(title)}</span>
		</div>
	);
};

export default PageNavTitle;
