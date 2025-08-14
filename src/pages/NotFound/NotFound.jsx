import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
	const { lng } = useParams();

	return (
		<>
			<Helmet>
				<title>404</title>
			</Helmet>
			<main className="not-found">
				<p className="not-found__title">404</p>
				<p>Page Not Found</p>
				<NavLink className="not-found__link" to={`/${lng}`}>
					Go Back Home
				</NavLink>
			</main>
		</>
	);
};

export default NotFound;
