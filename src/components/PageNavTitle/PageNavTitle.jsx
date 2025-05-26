import { HashLink } from "react-router-hash-link";
import "./PageNavTitle.scss";

const PageNavTitle = ({ title, previousTitle, homeTitle }) => {
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
			<span>{title}</span>
		</div>
	);
};

export default PageNavTitle;
