import {createSlice} from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menuState',
    initialState: {
        paymentMenuState: {State: false, zIndex: 99},
        cartState: {State: false, zIndex: 97},
        searchMenuState: {State: false, zIndex: 95},
        categoriesTabState: {State: false, zIndex: 93},
    },
    reducers: {
        togglePaymentMenu: (state, action) => {
            const {State} = action.payload;
            state.paymentMenuState.State = State;
        },
        toggleCartMenu: (state, action) => {
            const {State} = action.payload;
            state.cartState.State = State;
        },
        toggleSearchMenu: (state, action) => {
            const {State} = action.payload;
            state.searchMenuState.State = State;
        },
        toggleCategories: (state, action) => {
            const {State} = action.payload;
            state.categoriesTabState.State = State;
        },
    }
});

export const {toggleCartMenu, toggleSearchMenu, toggleCategories, togglePaymentMenu} = menuSlice.actions;
export default menuSlice.reducer;