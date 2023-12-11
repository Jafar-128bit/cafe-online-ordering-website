import "./list.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductList = ({productData = []}) => {
    return (
            <section className="list__container">
                <section
                    className="list__section__01"
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