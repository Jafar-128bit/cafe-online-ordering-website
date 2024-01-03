import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../store/slices/cartSlices";
import {useEffect, useState} from "react";

import GridViewCard from "./GridViewCard/GridViewCard";

import {couponList, specialMessage} from "../../data/data";

const ProductCard = ({id, productName, productImage, price, type = "", index}) => {
    const [buyBtn, setBuyBtn] = useState(false);
    const [isDiscount, setIsDiscount] = useState(false);
    const [discount, setDiscount] = useState(0);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartItems);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    useEffect(() => {
        const isItemInCart = cartData.some((item) => item.id === id);
        const isItemInDiscount = couponList
            .filter(coupon => coupon.type === "on-Product")
            .map(coupon => coupon.validProduct)
            .some(itemId => itemId.includes(id));
        const couponDiscountValue = couponList.filter(coupon => coupon.type === "on-Product")
            .find(coupon => coupon.validProduct.includes(id))?.discount || null;

        setDiscount(couponDiscountValue);
        setBuyBtn(isItemInCart);
        setIsDiscount(isItemInDiscount);
    }, [cartData, id]);

    const [indexNumber, setIndexNumber] = useState(0);
    const [message, setMessage] = useState(true);

    useEffect(() => {
        const randomIndexGenerator = (numberLimit) => {
            if (typeof numberLimit !== 'number' || numberLimit <= 0) {
                throw new Error('Invalid limit, Provide a positive number.');
            }

            setMessage(false);
            setTimeout(() => {
                setIndexNumber(Math.floor(Math.random() * numberLimit));
                setMessage(true);
            }, 500);
        };

        const intervalId = setInterval(() => randomIndexGenerator(specialMessage.length), 2500);
        return () => clearInterval(intervalId);
    }, []);

    const handleBuy = () => {
        if (!buyBtn) {
            dispatch(addToCart({
                id: id,
                productImage: productImage,
                productName: productName,
                price: price,
                quantity: 1,
            }));
            setBuyBtn(true);
        } else if (buyBtn) {
            dispatch(removeFromCart(id));
            setBuyBtn(false);
        }
    }

    return <>
        {type === "gridView" && <GridViewCard
            id={id}
            theme={theme}
            productImage={productImage}
            productName={productName}
            price={price}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
            index={index}
            isDiscount={isDiscount}
            discount={discount}
            indexNumber={indexNumber}
            message={message}
        />}
    </>
}

export default ProductCard;