import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import "./i18n";
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
import i18n from "i18next";
import { useParams } from "react-router-dom";
import productsData from "./assets/data/products-data.json";
import NotFound from "./pages/NotFound/NotFound";
import { Product } from "./interfaces/Product";

// This wrapper handles language detection
const LanguageLayout = () => {
	const { lng } = useParams();

	const supportedLanguages = ["uk", "en"];

	// TODO:
	const isValidLng = lng && supportedLanguages.includes(lng);

	useEffect(() => {
		if (isValidLng && i18n.language !== lng) {
			i18n.changeLanguage(lng);
		}
	}, [lng]);

	// TODO:
	const productsDataTyped: Product[] = productsData as Product[];
	return (
		<>
			<Loading />
			<ScrollToTop />
			<Header productsData={productsData} />
			{isValidLng ? (
				<Routes>
					<Route path="/" element={<Home productsData={productsDataTyped} />} />
					<Route
						path="/product-page/:id"
						element={<ProductPage productsData={productsDataTyped} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			) : (
				<NotFound />
			)}

			<Footer productsData={productsData} />
		</>
	);
};

export default LanguageLayout;
