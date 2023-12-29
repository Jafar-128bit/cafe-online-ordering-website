import {createSlice} from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menuState',
    initialState: {
        notificationMenuState: {State: false, zIndex: 99},
        couponMenuState: {State: false, zIndex: 97},
        menuBarState: {State: true},
        navbarState: {State: true},
    },
    reducers: {
        toggleNotificationMenu: (state, action) => {
            const {State} = action.payload;
            state.notificationMenuState.State = State;
        },
        toggleCouponMenu: (state, action) => {
            const {State} = action.payload;
            state.couponMenuState.State = State;
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
    toggleNotificationMenu,
    toggleCouponMenu,
    toggleMenuBar,
    toggleNavbar,
} = menuSlice.actions;
export default menuSlice.reducer;