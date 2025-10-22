import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import cameraIcon from "/icons/camera.png";
import organicLogo from "/icons/organic-logo.jpg";
import { Product } from "../../interfaces/Product";
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

	const harvestData = [
		{ id: 1, title: t("jan"), name: t("jan_s") },
		{ id: 2, title: t("feb"), name: t("feb_s") },
		{ id: 3, title: t("mar"), name: t("mar_s") },
		{ id: 4, title: t("apr"), name: t("apr_s") },
		{ id: 5, title: t("may"), name: t("may_s") },
		{ id: 6, title: t("jun"), name: t("jun_s") },
		{ id: 7, title: t("jul"), name: t("jul_s") },
		{ id: 8, title: t("aug"), name: t("aug_s") },
		{ id: 9, title: t("sep"), name: t("sep_s") },
		{ id: 10, title: t("oct"), name: t("oct_s") },
		{ id: 11, title: t("nov"), name: t("nov_s") },
		{ id: 12, title: t("dec"), name: t("dec_s") },
	];

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
				{harvestData.map((month) => {
					return (
						<div
							title={month.title}
							className={`harvest-month ${
								harvest.includes(month.id) ? "month--active" : ""
							}`}
						>
							{month.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductCard;
