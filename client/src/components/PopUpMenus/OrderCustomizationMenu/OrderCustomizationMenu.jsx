import './orderCustomizationMenu.css';
import './lightModeStyle.css';
import './darkModeStyle.css';
import './mediaQueryOrderCustomizationMenu.css';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {togglePopUpCard} from "../../../store/slices/popCardSlices";
import {updateCart} from "../../../store/slices/cartSlices";
import {useEffect, useState} from "react";

const OrderCustomizationMenu = ({data}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const cartData = useSelector((state) => state.cartItems);
    const customizeOptions = data.customizeOptions;
    const subCategories = data.subCategories;

    useEffect(() => {
        setMessage(cartData.find(item => item.id === data.id).customizeOptions[0].message);
    }, [cartData, data.id]);

    const handleCalculateTotalPrice = (isCake, totalPrice, subCategories = [], customizeOptions = []) => {
        const totalEatCost = subCategories.map((value, index) => value.price * customizeOptions[index].eatQuantity).reduce((acc, cur) => acc + cur, 0);
        const totalPackCost = subCategories.map((value, index) => value.price * customizeOptions[index].packQuantity).reduce((acc, cur) => acc + cur, 0);
        if (isCake) {
            return totalPrice
        }
        return totalEatCost + totalPackCost;
    }

    const handleCloseCustomizationMenu = () => dispatch(togglePopUpCard({
        isPopUpOpen: false,
        popUpType: "",
        itemId: null
    }));

    const handleQuantity = (type = "", flag = "", index = 0) => {
        switch (type) {
            case "EAT-QUANTITY":
                let newEatQuantity;
                if (flag === "dec" && data.totalQuantity > 1) newEatQuantity = data.customizeOptions[index].eatQuantity - 1;
                else if (flag === "inc") newEatQuantity = data.customizeOptions[index].eatQuantity + 1;
                else return;

                dispatch(updateCart({
                    actionType: "UPDATE-EAT-QUANTITY",
                    actionData: {id: data.id, data: newEatQuantity, index: index},
                }));
                break;
            case "PACK-QUANTITY":
                let newPackQuantity;
                if (flag === "dec" && data.totalQuantity > 1) newPackQuantity = data.customizeOptions[index].packQuantity - 1;
                else if (flag === "inc") newPackQuantity = data.customizeOptions[index].packQuantity + 1;
                else return;

                dispatch(updateCart({
                    actionType: "UPDATE-PACK-QUANTITY",
                    actionData: {id: data.id, data: newPackQuantity, index: index},
                }));
                break;
            default:
                return;
        }


    };

    const handleUpdateCake = (type = "", qtyFlag = "") => {
        switch (type) {
            case "TOTAL-QUANTITY":
                let totalQuantity;
                if (qtyFlag === "dec" && data.totalQuantity > 1) totalQuantity = data.totalQuantity - 1;
                else if (qtyFlag === "inc") totalQuantity = data.totalQuantity + 1;
                else return;
                dispatch(updateCart({
                    actionType: "UPDATE-TOTAL-QUANTITY",
                    actionData: {id: data.id, data: totalQuantity},
                }));
                break;
            case "CANDLE-QUANTITY":
                let candleQuantity;
                if (qtyFlag === "dec" && data.customizeOptions[1].candlesQuantity > 1) candleQuantity = data.customizeOptions[1].candlesQuantity - 2;
                else if (qtyFlag === "inc") candleQuantity = data.customizeOptions[1].candlesQuantity + 2;
                else return;
                dispatch(updateCart({
                    actionType: "UPDATE-CANDLE-QUANTITY",
                    actionData: {id: data.id, data: candleQuantity},
                }));
                break;
            case "CAKE-MESSAGE":
                dispatch(updateCart({
                    actionType: "UPDATE-CAKE-MESSAGE",
                    actionData: {id: data.id, data: message},
                }));
                break;
            default:
                return;
        }
    }

    return (
        <section className="orderCustomizationMenu whiteGlass50">
            <div className="orderCustomizationMenu__card">
                <button
                    type="button"
                    className="orderCustomizationMenu__menuCloseBtn"
                    onClick={handleCloseCustomizationMenu}
                >
                    <CloseOutlinedIcon style={{
                        color: "var(--colorWhite)",
                        fontSize: "18px",
                    }}/>
                    Close
                </button>
                <h2 className="orderCustomizationMenu__menuTitle">
                    Customize Your Order
                </h2>
                <section className="orderCustomizationMenu__productInfoContainer">
                    <img src={data.productImage} alt={data.productName}/>
                    <motion.div
                        className="orderCustomizationMenu__productInfo"
                        initial={{y: 150}}
                        animate={{y: 0}}
                        transition={{ease: "easeOut", duration: 0.5}}
                    >
                        <h3 className="orderCustomizationMenu__productInfo__title">
                            {data.productName}
                        </h3>
                        <p className="orderCustomizationMenu__productInfo__price">
                            <small>₹</small>
                            {handleCalculateTotalPrice(
                                data.categories === "cakes",
                                data.totalPrice,
                                data?.subCategories,
                                data?.customizeOptions,
                            )}.00
                        </p>
                        <div className="orderCustomizationMenu__productInfo__customizeOptions">
                            {customizeOptions.map((value, index) =>
                                <motion.div
                                    key={index}
                                    style={{width: `calc((100% / ${customizeOptions.length}) - 5px)`}}
                                    initial={{y: 70}}
                                    animate={{y: 0}}
                                    transition={{delay: 0.25 * (index + 1)}}
                                >
                                    <p>{value.title}</p>
                                    {
                                        data.categories !== "cakes" &&
                                        <p><small>Price ₹{data.subCategories[index].price}</small></p>
                                    }
                                    {
                                        data.categories === "cakes" && data.customizeOptions[index].price &&
                                        <p><small>Price ₹{data.customizeOptions[index].price}</small></p>
                                    }
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
                <section className="orderCustomizationMenu__customizationSetting">
                    <p className="orderCustomizationMenu__customizationSetting__infoContainer">
                        Total price is ₹{handleCalculateTotalPrice(
                        data.categories === "cakes",
                        data.totalPrice,
                        data?.subCategories,
                        data?.customizeOptions,
                    )} And Total Quantity
                        is {data.totalQuantity},
                        added to basket.
                    </p>
                    {data.categories !== "cakes" && subCategories.map((categories, index) =>
                        <motion.section
                            key={index + 1}
                            className="orderCustomizationMenu__customizationSetting__optionsContainer"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 0.25 * (index + 1)}}
                        >
                            <h4 className="orderCustomizationMenu__customizationSetting__optionsTitle">
                                {categories.title}
                            </h4>
                            <div className="orderCustomizationMenu__customizationSetting__option">
                                <p>Eat here</p>
                                <div className="orderCustomizationMenu__customizationSetting__optionQtyBtnContainer">
                                    <button
                                        className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                        onClick={() => handleQuantity("EAT-QUANTITY", "dec", index)}
                                    >
                                        <RemoveOutlinedIcon/>
                                    </button>
                                    <p className="orderCustomizationMenu__customizationSetting__optionQtyCounter">
                                        {data.customizeOptions[index].eatQuantity}
                                    </p>
                                    <button
                                        className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                        onClick={() => handleQuantity("EAT-QUANTITY", "inc", index)}
                                    >
                                        <AddOutlinedIcon/>
                                    </button>
                                </div>
                                <p>Price ₹{categories.price * data.customizeOptions[index].eatQuantity}</p>
                            </div>
                            <div className="orderCustomizationMenu__customizationSetting__option">
                                <p>Pack</p>
                                <div className="orderCustomizationMenu__customizationSetting__optionQtyBtnContainer">
                                    <button
                                        type="button"
                                        className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                        onClick={() => handleQuantity("PACK-QUANTITY", "dec", index)}
                                    >
                                        <RemoveOutlinedIcon/>
                                    </button>
                                    <p className="orderCustomizationMenu__customizationSetting__optionQtyCounter">
                                        {data.customizeOptions[index].packQuantity}
                                    </p>
                                    <button
                                        type="button"
                                        className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                        onClick={() => handleQuantity("PACK-QUANTITY", "inc", index)}
                                    >
                                        <AddOutlinedIcon/>
                                    </button>
                                </div>
                                <p>Price ₹{categories.price * data.customizeOptions[index].packQuantity}
                                </p>
                            </div>
                        </motion.section>
                    )}
                    {data.categories === "cakes" &&
                        <>
                            <motion.section
                                className="orderCustomizationMenu__customizationSetting__optionsContainer"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: 0.25}}
                            >
                                <h4 className="orderCustomizationMenu__customizationSetting__optionsTitle">
                                    Quantity
                                </h4>
                                <div className="orderCustomizationMenu__customizationSetting__option">
                                    <p>Quantity</p>
                                    <div
                                        className="orderCustomizationMenu__customizationSetting__optionQtyBtnContainer">
                                        <button
                                            className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                            onClick={() => handleUpdateCake("TOTAL-QUANTITY", "dec")}
                                        >
                                            <RemoveOutlinedIcon/>
                                        </button>
                                        <p className="orderCustomizationMenu__customizationSetting__optionQtyCounter">
                                            {data.totalQuantity}
                                        </p>
                                        <button
                                            className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                            onClick={() => handleUpdateCake("TOTAL-QUANTITY", "inc")}
                                        >
                                            <AddOutlinedIcon/>
                                        </button>
                                    </div>
                                    <p>Price
                                        ₹{data.totalPrice}</p>
                                </div>
                            </motion.section>
                            <motion.section
                                className="orderCustomizationMenu__customizationSetting__optionsContainer"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: 0.25 * 2}}
                            >
                                <h4 className="orderCustomizationMenu__customizationSetting__optionsTitle">
                                    Add message or names
                                </h4>
                                <textarea
                                    className="orderCustomizationMenu__customizationSetting__cakeMessage noScroll"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="Kindly share the details of your message, and if you're ordering more than one cake, please provide a delightful description for each delectable creation here."
                                />
                                <button
                                    type="button"
                                    className="orderCustomizationMenu__customizationSetting__cakeMessageBtn"
                                    onClick={() => handleUpdateCake("CAKE-MESSAGE")}
                                >
                                    Update!
                                </button>
                            </motion.section>
                            <motion.section
                                className="orderCustomizationMenu__customizationSetting__optionsContainer"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: 0.25 * 3}}
                            >
                                <h4 className="orderCustomizationMenu__customizationSetting__optionsTitle">
                                    Add Candles
                                </h4>
                                <div className="orderCustomizationMenu__customizationSetting__option">
                                    <p>Add Candles</p>
                                    <div
                                        className="orderCustomizationMenu__customizationSetting__optionQtyBtnContainer">
                                        <button
                                            className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                            onClick={() => handleUpdateCake("CANDLE-QUANTITY", "dec")}
                                        >
                                            <RemoveOutlinedIcon/>
                                        </button>
                                        <p className="orderCustomizationMenu__customizationSetting__optionQtyCounter">
                                            {data.customizeOptions[1].candlesQuantity}
                                        </p>
                                        <button
                                            className="orderCustomizationMenu__customizationSetting__optionQtyBtn"
                                            onClick={() => handleUpdateCake("CANDLE-QUANTITY", "inc")}
                                        >
                                            <AddOutlinedIcon/>
                                        </button>
                                    </div>
                                    <p>Price
                                        ₹{data.customizeOptions[1].price * data.customizeOptions[1].candlesQuantity}</p>
                                </div>
                            </motion.section>
                        </>
                    }
                </section>
            </div>
        </section>
    );
}

export default OrderCustomizationMenu;