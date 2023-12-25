import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../store/slices/cartSlices";
import {useEffect, useState} from "react";

import MainProductCard from "./MainProductCard/MainProductCard";
import TopProductCard from "./TopProductCard/TopProductCard";
import SearchProductCard from "./SearchProductCard/SearchProductCard";

import {couponList, specialMessage} from "../../data/data";
import {addCoupon, removeCoupon} from "../../store/slices/setCouponSlices";

const ProductCard = ({id, productName, productImage, price, type = "", index}) => {
    const [buyBtn, setBuyBtn] = useState(false);
    const [isDiscount, setIsDiscount] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [couponId, setCouponId] = useState(null);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartItems);

    useEffect(() => {
        const isItemInCart = cartData.some((item) => item.id === id);
        const isItemInDiscount = couponList.map(coupon => coupon.validProduct).some(itemId => itemId.includes(id));
        const couponDiscountValue = couponList.find(coupon => coupon.validProduct.includes(id))?.discount || null;
        const couponIdValue = couponList.find(coupon => coupon.validProduct.includes(id))?.id || null;

        setDiscount(couponDiscountValue);
        setCouponId(couponIdValue);
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
            dispatch(addCoupon(couponId));
            setBuyBtn(true);
        } else if (buyBtn) {
            dispatch(removeFromCart(id));
            dispatch(removeCoupon(couponId));
            setBuyBtn(false);
        }
    }

    return <>
        {type === "main" && <MainProductCard
            id={id}
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
        {type === "small" && <TopProductCard
            productImage={productImage}
            productName={productName}
            price={price}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
            rank={index + 1}
            isDiscount={isDiscount}
            discount={discount}
        />}
        {type === "searchList" && <SearchProductCard
            id={id}
            productImage={productImage}
            productName={productName}
            price={price}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
            isDiscount={isDiscount}
            discount={discount}
            indexNumber={indexNumber}
            message={message}
        />}
    </>
}

export default ProductCard;