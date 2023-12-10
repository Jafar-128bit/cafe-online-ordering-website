import './productCard.css';
import IconContainer from "../IconContainer/IconContainer";
import cartIcon from "../../assets/icons/cartIcon.svg";

const ProductCardMain = ({id, productImage, productName, price, buyBtn, handleBuy}) => {
    return (
        <div className="productCard" style={{backgroundImage: `url(${productImage})`}}>
            <p className="productCard__productName">{productName}</p>
            <p className="productCard__productPrice">₹{price}</p>
            <button
                className={
                    `productCard__addToCard ${buyBtn ?
                        "productCard__addToCard__hide"
                        : "productCard__addToCard__show"}`
                }
                onClick={handleBuy}
            >
                <IconContainer
                    src={cartIcon}
                    alt="cart icon svg"
                    width={32}
                    height={32}
                    background={false}
                />
                Buy
            </button>
        </div>
    );
}

export default ProductCardMain;