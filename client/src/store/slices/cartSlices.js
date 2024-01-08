import {createSlice} from '@reduxjs/toolkit';

//TODO: Serializer and Deserializer

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload;
            !state.some((product) => product.id === newProduct.id) && state.push(newProduct);
        },
        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload;
            return state.filter(item => item.id !== itemIdToRemove);
        },

        updateCart: (state, action) => {
            const {actionType, actionData} = action.payload;
            const itemIndex = state.findIndex(item => item.id === actionData.id);
            if (itemIndex === -1) return;

            const changeTotalQuantity = () => {
                state[itemIndex].totalQuantity =
                    state[itemIndex].customizeOptions.map(option => option.eatQuantity).reduce((acc, cur) => acc + cur, 0) +
                    state[itemIndex].customizeOptions.map(option => option.packQuantity).reduce((acc, cur) => acc + cur, 0)
            }

            const updateTotalPrice = () => {
                const calculateCategoryTotal = (customizeOptions, quantityMultiplier) => {
                    return state[itemIndex].subCategories
                        .map((value, index) => value.price * customizeOptions[index][quantityMultiplier])
                        .reduce((acc, cur) => acc + cur, 0);
                };
                const totalEatCost = calculateCategoryTotal(state[itemIndex].customizeOptions, 'eatQuantity');
                const totalPackCost = calculateCategoryTotal(state[itemIndex].customizeOptions, 'packQuantity');
                state[itemIndex].totalPrice = totalEatCost + totalPackCost;
            };

            const updateQuantityAndTotalPrice = (index, quantityType, quantity) => {
                if (itemIndex !== -1) {
                    state[itemIndex].totalQuantity = 0;
                    state[itemIndex].totalPrice = 0;
                    state[itemIndex].customizeOptions[index][quantityType] = quantity;
                    changeTotalQuantity();
                    updateTotalPrice();
                }
            };

            const updateTotalPriceAndQuantity = () => {
                if (itemIndex !== -1) {
                    state[itemIndex].totalPrice = 0;
                    state[itemIndex].totalQuantity = actionData.data;
                    state[itemIndex].totalPrice =
                        state[itemIndex].actualPrice * state[itemIndex].totalQuantity +
                        state[itemIndex].customizeOptions[1]?.candlesQuantity * state[itemIndex].customizeOptions[1]?.price;
                }
            };

            const updateCakeMessage = () => {
                if (itemIndex !== -1) {
                    state[itemIndex].customizeOptions[0].message = actionData.data;
                }
            };

            const updateCandleQuantity = () => {
                if (itemIndex !== -1) {
                    state[itemIndex].totalPrice = 0;
                    state[itemIndex].customizeOptions[1].candlesQuantity = actionData.data;
                    state[itemIndex].totalPrice =
                        state[itemIndex].actualPrice * state[itemIndex].totalQuantity +
                        state[itemIndex].customizeOptions[1]?.candlesQuantity * state[itemIndex].customizeOptions[1]?.price;
                }
            };

            switch (actionType) {
                case "UPDATE-EAT-QUANTITY":
                    updateQuantityAndTotalPrice(actionData.index, 'eatQuantity', actionData.data);
                    break;
                case "UPDATE-PACK-QUANTITY":
                    updateQuantityAndTotalPrice(actionData.index, 'packQuantity', actionData.data);
                    break;
                case "UPDATE-TOTAL-QUANTITY":
                    updateTotalPriceAndQuantity();
                    break;
                case "UPDATE-CAKE-MESSAGE":
                    updateCakeMessage();
                    break;
                case "UPDATE-CANDLE-QUANTITY":
                    updateCandleQuantity();
                    break;
                default:
                    return;
            }
        },
        updateCartItem: (state, action) => {
            const {itemId, updatedItem} = action.payload;
            const itemIndex = state.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                state[itemIndex] = updatedItem;
            }
        },
        clearCart: () => {
            return [];
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    updateCart,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer;