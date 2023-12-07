import './productCardSearchResult.css';
import ImageContainer from "../ImageContainer/ImageContainer";

const ProductCardSearchResult = ({id, productImage, productName, price, buyBtn, handleBuy}) => {
    return (
        <div className="productCardSearchResult">
            <div className="productCardSearchResult__imageContainer">
                <ImageContainer
                    src={productImage}
                    alt={productName}
                    height="100%"
                    width="100%"
                />
            </div>
            <p className="productCardSearchResult__productName">{productName}</p>
            <p className="productCardSearchResult__productPrice">₹{price}</p>
            <button
                type="button"
                className={`productCardSearchResult__addToCartBtn ${buyBtn ? 'productCardSearchResult__addToCartBtnHide' : 'productCardSearchResult__addToCartBtnShow'}`}
                onClick={handleBuy}
            >
                Buy
            </button>
        </div>
    );
}

export default ProductCardSearchResult;