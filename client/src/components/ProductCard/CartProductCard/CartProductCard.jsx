import './cartProductCard.css';
import './darkModeStyle.css';
import './lightModeStyle.css';
import './mediaQueryCartProductCard.css';

import {togglePopUpCard} from "../../../store/slices/popCardSlices";

const CartProductCard = ({
                             id,
                             productName,
                             productImage,
                             totalPrice,
                             totalQuantity,
                             subCategories,
                             categories,
                             isCustomizable,
                             customizeOptions,
                             dispatch,
                             setItemToRemove,
                             setTogglePopMessage,
                             theme
                         }) => {
    const handleRemove = () => {
        setItemToRemove({
            id: id,
            productName,
            productImage,
            price: totalPrice,
        });
        setTogglePopMessage(true);
    }

    const handleOpenCustomizationMenu = () => {
        dispatch(togglePopUpCard({isPopUpOpen: true, popUpType: "orderCustomizationMenu", itemId: id}));
    }

    // className={` ${theme === "dark" ? "__dark" : "__light"}`}

    return (
        <div
            className={`cart__productInfo 
            ${theme === "dark" ? "cart__productInfo__dark" : "cart__productInfo__light"}`}
        >
            <section className="cart__productInfo__section01">

                <div className="cart__productInfo__section01__imageContainer">
                    <img src={productImage} alt={productName}/>
                </div>

                <div
                    className={`
                    cart__productInfo__section01__infoContainer 
                    ${theme === "dark"
                        ? "cart__productInfo__section01__infoContainer__dark"
                        : "cart__productInfo__section01__infoContainer__light"}`
                    }
                >
                    <p
                        className={`
                        cart__productInfo__section01__infoContainer__productName 
                        ${theme === "dark"
                            ? "cart__productInfo__section01__infoContainer__productName__dark"
                            : "cart__productInfo__section01__infoContainer__productName__light"}`
                        }
                    >
                        {productName}
                    </p>
                    <div
                        className={`
                        cart__productInfo__section01__infoContainer__productPrice 
                        ${theme === "dark"
                            ? "cart__productInfo__section01__infoContainer__productPrice__dark"
                            : "cart__productInfo__section01__infoContainer__productPrice__light"}`
                        }
                    >
                        <p>₹{totalPrice}.00</p>
                        <p><small>Total Quantity</small> {totalQuantity < 10 ? `0${totalQuantity}` : totalQuantity}</p>
                    </div>
                </div>

            </section>
            {
                isCustomizable && categories !== "cakes" &&
                <section className="cart__productInfo__section02">
                    {
                        subCategories.map((value, index) =>
                            <div
                                key={index + 1}
                                className={`
                                cart__productInfo__section02__optionContainer ${theme === "dark"
                                    ? "cart__productInfo__section02__optionContainer__dark"
                                    : "cart__productInfo__section02__optionContainer__light"}`
                                }
                                style={{height: `calc((95% / ${subCategories.length}) - 5px)`}}
                            >
                                <p>
                                    {value.title}
                                </p>
                                <p>
                                    Price
                                    ₹{value.price * (customizeOptions[index].eatQuantity + customizeOptions[index].packQuantity)}.00
                                </p>
                                <p>
                                    Quantity {customizeOptions[index].eatQuantity + customizeOptions[index].packQuantity}
                                </p>
                            </div>
                        )}
                </section>
            }
            <section className="cart__productInfo__section03">
                {
                    isCustomizable &&
                    <button
                        type="button"
                        className="cart__productInfo__section03__btn"
                        onClick={handleOpenCustomizationMenu}
                    >
                        Customize Your Order
                    </button>
                }
                <button
                    type="button"
                    className="cart__productInfo__section03__btn closeType"
                    onClick={handleRemove}
                >
                    Remove Your Order
                </button>
            </section>
        </div>
    );
}

export default CartProductCard;