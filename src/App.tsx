import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./i18n";
import { useEffect } from "react";
import LanguageLayout from "./LanguageLayout";
import getStorage from "./utils/getStorage";
import "./scss/App.scss";

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
				{/* TODO: */}
				<Route
					path="/"
					element={<Navigate to={`/${getStorage()}`} replace />}
				/>
				{/* Wrap all routes in /:lng path */}
				<Route path="/:lng/*" element={<LanguageLayout />} />
			</Routes>
		</Router>
	);
}

export default App;
