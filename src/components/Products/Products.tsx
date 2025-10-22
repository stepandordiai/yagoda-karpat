import { useTranslation } from "react-i18next";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import searchIcon from "/icons/search.png";
import closeIcon from "/icons/close.png";
import { Product } from "../../interfaces/Product";
import "./Products.scss";

type ProductsProps = {
	productsData: Product[];
};

const Products: React.FC<ProductsProps> = ({ productsData }) => {
	const { t } = useTranslation();

	const [search, setSearch] = useState("");
	const [productType, setProductType] = useState("all");

	function clearSearch() {
		setSearch("");
	}

	const uniqueTypes = [...new Set(productsData.map((product) => product.type))];

	const handleProductType = (props: string) => {
		setProductType((prev) => (prev = props));
	};

	// TODO:
	const filteredProducts = productsData.filter((product) => {
		// const matchesSearch = search.trim() === ""
		// 					? product
		// 					: // I used startsWith method here, but i think includes method is much better here.
		// 					  // For example with 'black currant', if i use startsWith, i have to start with black to find this product.
		// 					  t(product.name).toLowerCase().includes(search.toLowerCase());

		const matchesSearch =
			search.trim() === "" ||
			t(product.name).toLowerCase().includes(search.toLowerCase());

		const matchesType = productType === "all" || product.type === productType;

		return matchesSearch && matchesType;
	});

	return (
		<div className="js-products" id="products">
			<SectionTitle name={t("products_title")} />
			<div>
				<p className="filter-title">{t("products.filter")}</p>
				<div className="products__btn-container">
					<button
						onClick={() => handleProductType("all")}
						className={`products__btn ${
							productType === "all" ? "products__btn--active" : ""
						}`}
					>
						{t("all")}
					</button>
					{uniqueTypes.map((type) => {
						return (
							<button
								onClick={() => handleProductType(type)}
								className={`products__btn ${
									productType === type ? "products__btn--active" : ""
								}`}
							>
								{t(type)}
							</button>
						);
					})}
				</div>
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
				{filteredProducts.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</div>
		</div>
	);
};

export default Products;
