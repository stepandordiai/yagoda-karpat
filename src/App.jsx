import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NavCurtain from "./components/NavCurtain/NavCurtain";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import "./i18n";
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
import "./App.scss";

function App() {
	useEffect(() => {
		document.body.classList.add("body--hidden");
		setTimeout(() => {
			document.body.classList.remove("body--hidden");
		}, 2250);
	}, []);
	return (
		<Router>
			<Loading />
			<ScrollToTop />
			<Header />
			<NavCurtain />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:id" element={<ProductPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
