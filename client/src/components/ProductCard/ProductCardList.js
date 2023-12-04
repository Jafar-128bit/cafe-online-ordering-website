import './productCardList.css';
import ImageContainer from "../ImageContainer/ImageContainer";
import {useDispatch} from "react-redux";
import {removeFromCart, updateCartItem} from "../../store/slices/cartSlices";

const ProductCardList = ({id, productName, productImage, price, quantity}) => {
    const dispatch = useDispatch();
    const isDecBtnDisable = {cursor: quantity === 1 ? "not-allowed" : "pointer",};
    const isIncBtnDisable = {cursor: quantity < 10 ? "pointer" : "not-allowed",};
    const handleRemove = () => dispatch(removeFromCart(id));

    const handleQuantity = (flag) => {
        if (flag === "dec" && quantity > 1) {
            dispatch(updateCartItem({
                itemId: id,
                updatedItem: {
                    id: id,
                    productImage: productImage,
                    productName: productName,
                    price: price,
                    quantity: quantity -= 1,
                }
            }));
        } else if (flag === "inc" && quantity < 10) {
            dispatch(updateCartItem({
                itemId: id,
                updatedItem: {
                    id: id,
                    productImage: productImage,
                    productName: productName,
                    price: price,
                    quantity: quantity += 1,
                }
            }));
        }
    }

    return (
        <div className="productCardList">
            <ImageContainer
                src={productImage}
                alt={productName}
                width="200px"
                height="150px"
                boxShadow="var(--shadow_02)"
            />
            <button type="button" className="productCardList__removeBtn" onClick={handleRemove}>Remove</button>
            <div className="productCardList__info">
                <p className="productCardList__info__productName">{productName}</p>
                <div className="productCardList__info__price">
                    <p className="productCardList__info__price__productPrice">₹{price}</p>
                    <p className="productCardList__info__price__productPriceTotal">Total ₹{price * quantity}</p>
                </div>
            </div>
            <div className="productCardList__QtyBtn">
                <button
                    type="button"
                    className="productCardList__QtyBtn__btn"
                    style={{...isIncBtnDisable}}
                    onClick={() => handleQuantity("inc")}
                >
                    +
                </button>
                <p className="productCardList__QtyBtn__Quantity">{quantity}</p>
                <button
                    type="button"
                    className="productCardList__QtyBtn__btn"
                    style={{...isDecBtnDisable}}
                    onClick={() => handleQuantity("dec")}
                >
                    -
                </button>
            </div>
        </div>
    );
}

export default ProductCardList;