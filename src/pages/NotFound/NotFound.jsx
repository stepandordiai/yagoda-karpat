import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
	const { lng } = useParams();

	return (
		<main className="not-found">
			<h1>404 - Page Not Found</h1>
			<NavLink className="not-found__link" to={`/${lng}`}>
				Go Back Home
			</NavLink>
		</main>
	);
};

export default NotFound;
