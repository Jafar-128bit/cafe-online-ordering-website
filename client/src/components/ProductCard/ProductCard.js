import './productCard.css';
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../store/slices/cartSlices";
import IconContainer from "../IconContainer/IconContainer";
import cartIcon from "../../assets/icons/cartIcon.svg";
import {useEffect, useState} from "react";

const ProductCard = ({id, productName, productImage, price}) => {
    const [buyBtn, setBuyBtn] = useState(false);
    const dispatch = useDispatch();

    const cartData = useSelector((state) => state.cartItems);

    useEffect(() => {
        const isItemInCart = cartData.some((item) => item.id === id);
        setBuyBtn(isItemInCart);
    }, [cartData, id]);

    const handleBuy = () => {
        dispatch(addToCart({
            id: id,
            productImage: productImage,
            productName: productName,
            price: price,
            quantity: 1,
        }));
        setBuyBtn(true);
    }
    return (
        <div className="productCard" style={{backgroundImage: `url(${productImage})`}}>
            <p className="productCard__productName">{productName}</p>
            <p className="productCard__productPrice">₹{price}</p>
            <button
                className={`productCard__addToCard ${buyBtn ? "productCard__addToCard__hide" : "productCard__addToCard__show"}`}
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

export default ProductCard;