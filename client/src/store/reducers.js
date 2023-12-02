import {combineReducers} from 'redux';
import menuSlice from "./slices/menuSlice";
import cartSlices from "./slices/cartSlices";
import categoriesSlices from "./slices/categoriesSlices";

const rootReducer = combineReducers({
    menuState: menuSlice,
    cartItems: cartSlices,
    categoriesState: categoriesSlices,
});

export default rootReducer;
