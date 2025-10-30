import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import "./i18n";
import Loading from "./components/Loading/Loading";
import { useParams } from "react-router-dom";
import productsData from "./assets/data/products-data.json";
import lngData from "./assets/data/lng-data.json";
import NotFound from "./pages/NotFound/NotFound";
import { Product } from "./interfaces/Product";

// This wrapper handles language detection
const LanguageLayout = () => {
	const { lng } = useParams();
	const supportedLanguages = lngData.map((lng) => lng.code);
	const isValidLng = lng && supportedLanguages.includes(lng);

	const productsDataTyped: Product[] = productsData as Product[];
	return (
		<>
			<ScrollToTop />
			<Loading />
			<Header productsData={productsDataTyped} />
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

			<Footer productsData={productsDataTyped} />
		</>
	);
};

export default LanguageLayout;
