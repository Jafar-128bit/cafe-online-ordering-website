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
        updateCartItem: (state, action) => {
            const {itemId, updatedItem} = action.payload;
            const itemIndex = state.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                state[itemIndex] = updatedItem;
            }
        },
        clearCart: (state) => {
            return [];
        }
    }
});

export const {addToCart, removeFromCart, updateCartItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;