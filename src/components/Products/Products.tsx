import { useTranslation } from "react-i18next";
import { useState } from "react";
import Product from "../Product/Product";
import SectionTitle from "../SectionTitle/SectionTitle";
import searchIcon from "/icons/search.png";
import closeIcon from "/icons/close.png";
import "./Products.scss";

interface ProductsData {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string[];
	desc: string;
	variants: {
		id: string;
		images?: string[];
		state?: string;
	}[];
	isOrganic?: boolean;
	harvest: number[];
}

interface ProductsProps {
	productsData: ProductsData[];
}

const Products: React.FC<ProductsProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const [search, setSearch] = useState("");

	function clearSearch() {
		setSearch("");
	}

	return (
		<div className="js-products" id="products">
			<SectionTitle name={t("products_title")} />
			<div>
				<p className="filter-title">{t("products.filter")}</p>
				<div className="search-wrapper">
					<input
						className="search-input"
						type="text"
						value={search}
						placeholder={t("products.filter_placeholder")}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						className="search-icon"
						onClick={search === "" ? undefined : clearSearch}
					>
						{search === "" ? (
							<img src={searchIcon} width={20} height={20} alt="" />
						) : (
							<img src={closeIcon} width={20} height={20} alt="" />
						)}
					</button>
				</div>
			</div>
			<div className="products-container">
				{productsData
					.filter((product) => {
						return search.trim() === ""
							? product
							: t(product.name).toLowerCase().startsWith(search.toLowerCase());
					})
					.map((product) => {
						return <Product key={product.id} product={product} />;
					})}
			</div>
		</div>
	);
};

export default Products;
