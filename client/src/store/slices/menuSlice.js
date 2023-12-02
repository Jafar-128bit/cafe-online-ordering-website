import {createSlice} from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menuState',
    initialState: {
        zIndex: 0,
        cartState: false,
        locationState: false,
        accountState: false,
        categoriesTab: false,
    },
    reducers: {
        toggleCartMenu: (state, action) => {
            const {zIndex, cartState} = action.payload;
            state.zIndex = zIndex;
            state.cartState = cartState;
        },
        toggleLocationMenu: (state, action) => {
            const {zIndex, locationState} = action.payload;
            state.zIndex = zIndex;
            state.locationState = locationState;
        },
        toggleAccountMenu: (state, action) => {
            const {zIndex, accountState} = action.payload;
            state.zIndex = zIndex;
            state.accountState = accountState;
        },
        toggleCategories: (state, action) => {
            const {categoriesTab} = action.payload;
            state.categoriesTab = categoriesTab;
        }
    }
});

export const {toggleCartMenu, toggleLocationMenu, toggleAccountMenu, toggleCategories} = menuSlice.actions;
export default menuSlice.reducer;