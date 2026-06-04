"use client";

import { useTranslations } from "next-intl";
import { Product } from "@/interfaces/Product";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import classNames from "classnames";
import ImageIcon from "../icons/ImageIcon";
import "./ProductCard.scss";

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const t = useTranslations();

	const { id, name, variants } = product;

	const [productStateId, setProductStateId] = useState(variants[0].id);
	const [productGradeId, setProductGradeId] = useState(
		variants[0].grades?.[0].id ?? null,
	);
	const [imgLoaded, setImgLoaded] = useState(false);

	const productState = variants.find((v) => v.id === productStateId);

	const productGrade = productState?.grades?.find(
		(g) => g.id === productGradeId,
	);

	// Resolved images — grade-level takes priority, then variant-level
	const images = productGrade?.images ?? productState?.images ?? [];

	const handleVariantChange = (id: number) => {
		setImgLoaded(false); // reset → placeholder shows
		setProductStateId(id);
	};

	// TODO:
	// const allImages = variants.flatMap((variant) =>
	// 	variant.images ? variant.images : []
	// );

	return (
		<div className="product">
			<div className="product__img-wrapper">
				{/* {productState?.images[0] && (
					<Image
						className="product__img"
						src={productState.images[0]}
						width={1600}
						height={1200}
						alt={`${t(name)} ${
							productState?.state ? t(productState.state) : ""
						}`.trimEnd()}
					/>
				)} */}
				{/* TODO: learn this */}
				{images[0] ? (
					<>
						{!imgLoaded && <div className="product__img-loading-placeholder" />}
						<Image
							className={classNames("product__img", {
								"product__img--hidden": !imgLoaded,
							})}
							src={images[0]}
							width={1600}
							height={1200}
							alt={`${t(name)} ${
								productState?.state ? t(productState.state) : ""
							}`.trimEnd()}
							onLoad={() => setImgLoaded(true)}
						/>
					</>
				) : (
					<div className="product__img-placeholder" />
				)}
				<div className="img-qty">
					<ImageIcon /> <span>{productGrade?.images.length}</span>
				</div>
			</div>
			<div className="product__info-container">
				<p style={{ color: "hsl(0, 0%, 50%)" }}>{product.latName}</p>
				<h3 className="product__name">{t(name)}</h3>
				{/* FIXME: */}
				{variants.some((variant) => variant.state) && (
					<>
						<h4 style={{ color: "hsl(0, 0%, 50%)" }}>
							{t("product_page.status")}
						</h4>
						<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
							{variants.map((variant) => {
								return (
									<button
										key={variant.id}
										onClick={() => handleVariantChange(variant.id)}
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

						{productState?.grades && productState.grades.length > 0 && (
							<>
								<h4 style={{ color: "hsl(0, 0%, 50%)" }}>
									{t("product_page.grade")}
								</h4>
								<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
									{productState.grades.map((grade) => (
										<button
											key={grade.id}
											onClick={() => setProductGradeId(grade.id)}
											className={classNames("variant-btn btn--bold", {
												"variant-btn--active": grade.id === productGradeId,
											})}
										>
											{grade.class}
										</button>
									))}
								</div>
							</>
						)}
					</>
				)}
				<Link href={`/products/${id}`} className="product__info-btn btn--bold">
					{t("products.productDetails")}
				</Link>
			</div>
		</div>
	);
}
