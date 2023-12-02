import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.push(newItem);
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