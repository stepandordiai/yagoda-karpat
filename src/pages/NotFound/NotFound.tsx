import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import getStorage from "../../utils/getStorage";
import Container from "../../components/Container/Container";
import "./NotFound.scss";

const NotFound = () => {
	return (
		<>
			<Helmet>
				<title>404</title>
				<meta name="robots" content="noindex, nofollow" />
			</Helmet>
			<main>
				<Container>
					<div className="not-found-inner">
						<p className="not-found__title">404</p>
						<p>Page Not Found</p>
						<NavLink className="not-found__link" to={`/${getStorage()}`}>
							Go Back Home
						</NavLink>
					</div>
				</Container>
			</main>
		</>
	);
};

export default NotFound;
