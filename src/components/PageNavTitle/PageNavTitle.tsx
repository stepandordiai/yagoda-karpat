import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
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
	const { lng } = useParams();

	return (
		<div className="page-nav-title">
			<NavLink className="page-nav-title__link" to={`/${lng}`}>
				{homeTitle}
			</NavLink>
			<span>/</span>
			<HashLink className="page-nav-title__link" to={`/${lng}/#products`}>
				{previousTitle}
			</HashLink>
			<span>/</span>
			<span>{t(title)}</span>
		</div>
	);
};

export default PageNavTitle;
