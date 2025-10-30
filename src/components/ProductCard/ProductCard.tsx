import { Product } from "../../interfaces/Product";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import harvestData from "./../../assets/data/harvest-data.json";
import cameraIcon from "/icons/camera.png";
import organicLogo from "/icons/organic-logo.jpg";
import "./ProductCard.scss";

type ProductProps = {
	product: Product;
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
	const { t } = useTranslation();
	const { lng } = useParams();

	const { id, name, variants, isOrganic, harvest, isIQF } = product;

	// TODO:
	const allImages = variants.flatMap((variant) =>
		variant.images ? variant.images : []
	);

	return (
		<div className="product">
			<div className="product-top">
				<div className="product__img-wrapper">
					{allImages.length ? (
						<>
							<img
								className="product__img"
								src={allImages[0]}
								alt={t(name)}
								loading="lazy"
							/>
							<div className="img-qty">
								<img
									src={cameraIcon}
									width={15}
									height={15}
									alt=""
									loading="lazy"
								/>
								<span>{allImages.length}</span>
							</div>
						</>
					) : (
						<div className="img--none"></div>
					)}
				</div>
				<div className="product__info-container">
					<div className="product__info-container-top">
						<h3 className="product-name">{t(name)}</h3>
						<div style={{ display: "flex", columnGap: 5 }}>
							{isIQF && <p>IQF</p>}
							{isOrganic && (
								<img
									src={organicLogo}
									alt="Organic Standard Logo"
									loading="lazy"
								/>
							)}
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
			<p style={{ fontWeight: 500 }}>{t("harvest_calendar")}</p>
			<div className="product__harvest">
				{harvestData.map(({ id, month }) => {
					return (
						<div
							title={t(month)}
							className={`harvest-month ${
								harvest.includes(id) ? "month--active" : ""
							}`}
						>
							{t(month)[0]}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductCard;
