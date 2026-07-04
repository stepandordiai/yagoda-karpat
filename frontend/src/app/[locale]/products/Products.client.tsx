"use client";

import { useTranslations } from "next-intl";
import classNames from "classnames";
import { useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import products from "@/data/products.json";
import SearchIcon from "@/components/icons/SearchIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import "./Products.scss";

export default function ProductsClient() {
	const t = useTranslations();

	const [search, setSearch] = useState("");
	const [productType, setProductType] = useState("all");

	function clearSearch() {
		setSearch("");
	}

	const uniqueTypes = [...new Set(products.map((product) => product.type))];

	const filteredProducts = products.filter((product) => {
		const matchesSearch =
			search.trim() === "" ||
			t(product.name).toLowerCase().includes(search.toLowerCase());

		const matchesType = productType === "all" || product.type === productType;

		return matchesSearch && matchesType;
	});

	return (
		<>
			<div className="products__filter-container">
				<div className="products__btn-container">
					{["all", ...uniqueTypes].map((type, i) => {
						const filteredProductsByType = products.filter(
							(p) => p.type === type,
						);

						return (
							<button
								key={i}
								onClick={() => setProductType(type)}
								className={classNames("products__btn btn--bold", {
									"products__btn--active": productType === type,
								})}
							>
								{t(type)} {i !== 0 && `(${filteredProductsByType.length})`}
							</button>
						);
					})}
				</div>
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
					{search === "" ? <SearchIcon size={24} /> : <CloseIcon size={24} />}
				</button>
			</div>
			<div className="products-container">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product, index) => {
						return (
							<ProductCard
								key={product.id}
								product={product}
								index={index}
								priorityLength={2}
							/>
						);
					})
				) : (
					<p>{t("products.productNotFound")}</p>
				)}
			</div>
		</>
	);
}
