import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import cameraIcon from "/icons/camera.png";
import organicLogo from "/icons/organic-logo.jpg";
import "./Product.scss";

interface ProductsData {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string;
	desc: string;
	variants: {
		id: string;
		images?: string[];
		state?: string;
	}[];
	isOrganic?: boolean;
	harvest: number[];
}

interface ProductProps {
	product: ProductsData;
}

const Product: React.FC<ProductProps> = ({ product }) => {
	const { t } = useTranslation();

	const { id, name, variants, latName, isOrganic, harvest } = product;

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
								alt=""
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
							<p>IQF</p>
							{isOrganic && <img src={organicLogo} alt="" />}
						</div>
					</div>
					<NavLink to={`/product-page/${id}`} className="product__info-btn">
						{t("products.show_more")}
					</NavLink>
				</div>
			</div>
			<p style={{ fontWeight: 500 }}>{t("harvest_calendar")}</p>
			<div className="product__harvest">
				<div
					title="January"
					className={
						harvest.includes(1)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("jan_s")}
				</div>
				<div
					title="February"
					className={
						harvest.includes(2)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("feb_s")}
				</div>
				<div
					title="March"
					className={
						harvest.includes(3)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("mar_s")}
				</div>
				<div
					title="April"
					className={
						harvest.includes(4)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("apr_s")}
				</div>
				<div
					title="May"
					className={
						harvest.includes(5)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("may_s")}
				</div>
				<div
					title="June"
					className={
						harvest.includes(6)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("jun_s")}
				</div>
				<div
					title="July"
					className={
						harvest.includes(7)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("jul_s")}
				</div>
				<div
					title="August"
					className={
						harvest.includes(8)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("aug_s")}
				</div>
				<div
					title="September"
					className={
						harvest.includes(9)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("sep_s")}
				</div>
				<div
					title="October"
					className={
						harvest.includes(10)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("oct_s")}
				</div>
				<div
					title="November"
					className={
						harvest.includes(11)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("nov_s")}
				</div>
				<div
					title="December"
					className={
						harvest.includes(12)
							? "harvest-month month--active"
							: "harvest-month"
					}
				>
					{t("dec_s")}
				</div>
			</div>
		</div>
	);
};

export default Product;
