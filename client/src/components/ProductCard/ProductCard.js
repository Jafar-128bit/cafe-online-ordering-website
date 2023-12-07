import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../store/slices/cartSlices";
import {useEffect, useState} from "react";
import ProductCardSmall from "./ProductCardSmall";
import ProductCardSearchResult from "./ProductCardSearchResult";
import ProductCardMain from "./ProductCardMain";

const ProductCard = ({id, productName, productImage, price, type = ""}) => {
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

    return <>
        {type === "main" && <ProductCardMain
            id={id}
            productImage={productImage}
            productName={productName}
            price={price}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
        />}
        {type === "small" && <ProductCardSmall
            id={id}
            productImage={productImage}
            productName={productName}
            price={price}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
        />}
        {type === "searchList" &&
        <ProductCardSearchResult
            id={id}
            productImage={productImage}
            productName={productName}
            price={price}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
        />}
    </>
}

export default ProductCard;