import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./i18n";
import { useEffect } from "react";
import productsData from "./data/products-data.json";
import "./scss/App.scss";
import LanguageLayout from "./LanguageLayout";

function App() {
	useEffect(() => {
		document.body.classList.add("body--hidden");
		setTimeout(() => {
			document.body.classList.remove("body--hidden");
		}, 2250);
	}, []);
	return (
		<Router>
			<Routes>
				{/* Redirect from / to default language */}
				<Route path="/" element={<Navigate to="/en" replace />} />
				{/* Wrap all routes in /:lng path */}
				<Route
					path="/:lng/*"
					element={<LanguageLayout productsData={productsData} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
