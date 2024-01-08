import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart, updateCart} from "../../store/slices/cartSlices";
import {useEffect, useState} from "react";

import GridViewCard from "./GridViewCard/GridViewCard";

import {couponList} from "../../data/data";
import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "../../data/data";
import {togglePopUpCard} from "../../store/slices/popCardSlices";
import {deepClone} from "../../util/utils";

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const ProductCard = ({
                         id,
                         productName,
                         productImage,
                         totalPrice,
                         categoryName,
                         isCustomizable,
                         type = "",
                         index
                     }) => {
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

    const handleBuy = () => {
        if (!buyBtn) {
            const addToCartItemData = deepClone(allItems.find(item => item.id === id)); //deep cloning of the objects and arrays

            isDiscount ? addToCartItemData.discount = discount : addToCartItemData.discount = 0;
            dispatch(addToCart(addToCartItemData));

            if (addToCartItemData.isCustomizable && addToCartItemData.categories !== "cakes") {
                dispatch(updateCart({
                    actionType: "UPDATE-EAT-QUANTITY",
                    actionData: {id: id, data: 1, index: 0},
                }));
            } else if (addToCartItemData.isCustomizable && addToCartItemData.categories === "cakes") {
                dispatch(updateCart({
                    actionType: "UPDATE-TOTAL-QUANTITY",
                    actionData: {id: id, data: 1},
                }));
            } else {
                dispatch(updateCart({
                    actionType: "UPDATE-TOTAL-QUANTITY",
                    actionData: {id: id, data: 1},
                }));
            }
            setBuyBtn(true);
            if (addToCartItemData.isCustomizable) handleOpenCustomizationMenu();
        } else if (buyBtn) {
            dispatch(removeFromCart(id));
            setBuyBtn(false);
        }
    }

    const handleOpenCustomizationMenu = () => {
        dispatch(togglePopUpCard({isPopUpOpen: true, popUpType: "orderCustomizationMenu", itemId: id}));
    }

    return <>
        {type === "gridView" && <GridViewCard
            id={id}
            theme={theme}
            productImage={productImage}
            productName={productName}
            totalPrice={totalPrice}
            categoryName={categoryName}
            isCustomizable={isCustomizable}
            buyBtn={buyBtn}
            handleBuy={handleBuy}
            handleOpenCustomizationMenu={handleOpenCustomizationMenu}
            index={index}
            isDiscount={isDiscount}
            discount={discount}
        />}
    </>
}

export default ProductCard;