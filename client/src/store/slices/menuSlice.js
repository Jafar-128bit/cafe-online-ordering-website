import {createSlice} from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menuState',
    initialState: {
        paymentMenuState: {State: false, zIndex: 99},
        couponMenuState: {State: false, zIndex: 99},
        searchMenuState: {State: false, zIndex: 93},
        categoriesTabState: {State: false, zIndex: 90},
        menuBarState: {State: true},
        navbarState: {State: true},
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
        toggleSearchMenu: (state, action) => {
            const {State} = action.payload;
            state.searchMenuState.State = State;
        },
        toggleCategories: (state, action) => {
            const {State} = action.payload;
            state.categoriesTabState.State = State;
        },
        toggleMenuBar: (state, action) => {
            const {State} = action.payload;
            state.menuBarState.State = State;
        },
        toggleNavbar: (state, action) => {
            const {State} = action.payload;
            state.navbarState.State = State;
        }
    }
});

export const {
    toggleSearchMenu,
    toggleCategories,
    togglePaymentMenu,
    toggleCouponMenu,
    toggleMenuBar,
    toggleNavbar,
} = menuSlice.actions;
export default menuSlice.reducer;