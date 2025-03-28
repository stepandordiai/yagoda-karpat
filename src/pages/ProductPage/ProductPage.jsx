import PageNavTitle from "../../components/PageNavTitle/PageNavTitle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { productsData } from "./../../data/productsData";
import ProductsData from "../../data/productsData";
import Product from "../../components/Product/Product";
import { useTranslation } from "react-i18next";
import "./ProductPage.scss";

const ProductPage = () => {
    const { t } = useTranslation();

    const productsData = ProductsData();

    const { id } = useParams();

    const productData = productsData.filter((product) => {
        // FIXME:
        return product.id === id;
    });

    const { pathname, hash } = useLocation();

    useEffect(() => {
        document.title = productData[0].name;
        // FIXME:
    }, [id, pathname, hash]);

    return (
        <>
            <PageNavTitle
                title={productData[0].name}
                previousTitle={t("products.title")}
                homeTitle={t("footer.home")}
            />
            <p className="coming-soon">{t("product_page.coming_soon")}</p>
            <p>{t("product_page.related")}</p>
            {productsData
                .filter((product) => {
                    return (
                        product.status === productData[0].status &&
                        product.type === productData[0].type &&
                        product.name !== productData[0].name
                    );
                })
                .map((product) => {
                    return <Product product={product} key={product.id} />;
                })}
        </>
    );
};

export default ProductPage;
