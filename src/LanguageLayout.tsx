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
import i18n from "i18next";
import { useParams } from "react-router-dom";
import productsData from "./assets/data/products-data.json";

// This wrapper handles language detection
const LanguageLayout = () => {
	const { lng } = useParams();

	useEffect(() => {
		if (lng && i18n.language !== lng) {
			i18n.changeLanguage(lng);
		}
	}, [lng]);

	return (
		<>
			<Loading />
			<ScrollToTop />
			<Header />
			<NavCurtain productsData={productsData} />
			<Routes>
				<Route path="/" element={<Home productsData={productsData} />} />
				<Route
					path="/product-page/:id"
					element={<ProductPage productsData={productsData} />}
				/>
			</Routes>
			<Footer productsData={productsData} />
		</>
	);
};

export default LanguageLayout;
