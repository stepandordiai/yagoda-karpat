import { Product } from "../../interfaces/Product";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import organicLogo from "/icons/organic-logo.jpg";
import "./ProductCard.scss";

type ProductProps = {
	product: Product;
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
	const { t } = useTranslation();
	const { lng } = useParams();

	const { id, name, variants, isOrganic } = product;

	const [productStateId, setProductStateId] = useState(variants[0].id);

	const productState = variants.find(
		(variant) => variant.id === productStateId
	);

	// TODO:
	// const allImages = variants.flatMap((variant) =>
	// 	variant.images ? variant.images : []
	// );

	return (
		<div className="product">
			<div className="product-top">
				<div className="product__img-wrapper">
					<img
						className="product__img"
						src={productState?.images[0]}
						alt={t(name)}
						loading="lazy"
					/>
					<div className="img-qty">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-camera"
							viewBox="0 0 16 16"
						>
							<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
							<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
						</svg>
						<span>{productState?.images.length}</span>
					</div>
				</div>
				<div className="product__info-container">
					<div className="product__info-container-top">
						<h3 className="product__name">{t(name)}</h3>
						<div style={{ display: "flex", columnGap: 5 }}>
							{isOrganic && (
								<img
									src={organicLogo}
									alt="Organic Standard Logo"
									loading="lazy"
								/>
							)}
							<span>HACCP</span>
						</div>
					</div>
					<NavLink
						to={`/${lng}/product-page/${id}`}
						className="product__info-btn"
					>
						{t("products.show_more")}
					</NavLink>
				</div>
			</div>
			{variants.some((variant) => variant.state) && (
				<div style={{ display: "flex", columnGap: 5 }}>
					{variants.map((variant) => {
						return (
							<button
								key={variant.id}
								onClick={() => setProductStateId(variant.id)}
								className={
									variant.id === productStateId
										? "variant-btn variant-btn--active"
										: "variant-btn"
								}
							>
								{/* TODO: */}
								{variant ? t(String(variant.state)) : ""}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ProductCard;
