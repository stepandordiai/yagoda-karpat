"use client";

import { useTranslations } from "next-intl";
import { Product } from "../../interfaces/Product";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import classNames from "classnames";
import CameraIcon from "@/app/icons/CameraIcon";
import "./ProductCard.scss";

type ProductProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductProps) {
	const t = useTranslations();

	const { id, name, variants, isOrganic } = product;

	const [productStateId, setProductStateId] = useState(variants[0].id);

	const productState = variants.find(
		(variant) => variant.id === productStateId,
	);

	// TODO:
	// const allImages = variants.flatMap((variant) =>
	// 	variant.images ? variant.images : []
	// );

	return (
		<div className="product">
			<div className="product__img-wrapper">
				{productState?.images[0] && (
					<Image
						className="product__img"
						src={productState.images[0]}
						width={1600}
						height={1200}
						alt={`${t(name)} ${
							productState?.state ? t(productState.state) : ""
						}`.trimEnd()}
					/>
				)}
				<div className="img-qty">
					<CameraIcon />
					<span>{productState?.images.length}</span>
				</div>
			</div>
			<div className="product__info-container">
				<p style={{ color: "hsl(0, 0%, 50%)" }}>{product.latName}</p>
				<h3 className="product__name">{t(name)}</h3>
				{variants.some((variant) => variant.state) && (
					<div>
						<h4 style={{ color: "hsl(0, 0%, 50%)", marginBottom: 5 }}>
							{t("product_page.status")}
						</h4>
						<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
							{variants.map((variant) => {
								return (
									<button
										key={variant.id}
										onClick={() => setProductStateId(variant.id)}
										className={classNames("variant-btn btn--bold", {
											"variant-btn--active": variant.id === productStateId,
										})}
									>
										{/* TODO: learn this */}
										{variant ? t(String(variant.state)) : ""}
									</button>
								);
							})}
						</div>
					</div>
				)}
				<Link href={`/products/${id}`} className="product__info-btn btn--bold">
					{t("products.productDetails")}
				</Link>
			</div>
		</div>
	);
}
