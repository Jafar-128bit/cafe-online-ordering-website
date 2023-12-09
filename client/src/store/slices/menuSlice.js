import {createSlice} from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menuState',
    initialState: {
        paymentMenuState: {State: false, zIndex: 99},
        couponMenuState: {State: false, zIndex: 99},
        cartState: {State: false, zIndex: 95},
        searchMenuState: {State: false, zIndex: 93},
        categoriesTabState: {State: false, zIndex: 90},
    },
    reducers: {
        togglePaymentMenu: (state, action) => {
            const {State} = action.payload;
            state.paymentMenuState.State = State;
        },
        toggleCouponMenu: (state, action) => {
            const {State} = action.payload;
            state.couponMenuState.State = State;
        }
        ,
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

export const {toggleCartMenu, toggleSearchMenu, toggleCategories, togglePaymentMenu, toggleCouponMenu} = menuSlice.actions;
export default menuSlice.reducer;