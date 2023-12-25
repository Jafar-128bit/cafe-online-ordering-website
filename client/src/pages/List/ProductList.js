import "./list.css";
import ProductCard from "../../components/ProductCard/ProductCard";

import {useLoaderData} from "react-router-dom";
import CategoriesTabSmall from "../../components/CategoriesTabSmall/CategoriesTabSmall";

const ProductList = () => {

    const productData = useLoaderData();

    return (
        <section className="list__productCardContainer noScroll">
            <CategoriesTabSmall/>
            <section
                className="list__productCardList"
            >
                {productData.map((value, index) => (
                    <ProductCard
                        key={value.id}
                        id={value.id}
                        index={index}
                        productName={value.productName}
                        productImage={value.productImage}
                        price={value.price}
                        type="main"
                    />
                ))}
            </section>
        </section>
    );
}

export default ProductList;