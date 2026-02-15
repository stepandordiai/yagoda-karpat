"use client";

import { Product } from "@/app/interfaces/Product";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import { useState, useLayoutEffect } from "react";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import productsData from "@/lib/data/products-data.json";
import "./Products.scss";

export default function ProductsClient() {
	const t = useTranslations();

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	}, []);

	const [search, setSearch] = useState("");
	const [productType, setProductType] = useState("all");

	const productsDataTyped = productsData as Product[];

	function clearSearch() {
		setSearch("");
	}

	const uniqueTypes = [
		...new Set(productsDataTyped.map((product) => product.type)),
	];

	const filteredProducts = productsDataTyped.filter((product) => {
		const matchesSearch =
			search.trim() === "" ||
			t(product.name).toLowerCase().includes(search.toLowerCase());

		const matchesType = productType === "all" || product.type === productType;

		return matchesSearch && matchesType;
	});

	return (
		<>
			<div className="products__filter-container">
				<p style={{ marginBottom: 5, fontWeight: 500 }}>
					{t("products.filter")}
				</p>
				<div className="products__btn-container">
					{["all", ...uniqueTypes].map((type, i) => {
						return (
							<button
								key={i}
								onClick={() => setProductType(type)}
								className={classNames("products__btn btn--bold", {
									"products__btn--active": productType === type,
								})}
							>
								{t(type)}
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
					{search === "" ? (
						<img src="/icons/search.svg" width={20} height={20} alt="" />
					) : (
						<img src="/icons/x-lg.svg" width={20} height={20} alt="" />
					)}
				</button>
			</div>
			<div className="products-container">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => {
						return <ProductCard key={product.id} product={product} />;
					})
				) : (
					<p>{t("products.productNotFound")}</p>
				)}
			</div>
		</>
	);
}
