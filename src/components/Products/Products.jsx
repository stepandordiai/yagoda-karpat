import { useTranslation } from "react-i18next";
import { useState } from "react";
import Product from "../Product/Product";
import PageTitle from "../PageTitle/PageTitle";
import searchIcon from "/icons/search.png";
import closeIcon from "/icons/close.png";
import "./Products.scss";

const Products = ({ productsData }) => {
	const { t } = useTranslation();

	const [search, setSearch] = useState("");

	function clearSearch() {
		setSearch("");
	}

	return (
		<section className="js-products" id="products">
			<PageTitle name={t("products_title")} />
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
							<img src={searchIcon} alt="" />
						) : (
							<img src={closeIcon} alt="" />
						)}
					</button>
				</div>
			</div>
			<div className="products-container">
				{productsData
					.filter((product) => {
						return search.toLowerCase() === ""
							? product
							: product.name.toLowerCase().startsWith(search.toLowerCase());
					})
					.map((product) => {
						return <Product key={product.id} product={product} />;
					})}
			</div>
		</section>
	);
};

export default Products;
