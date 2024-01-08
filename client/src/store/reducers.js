import {combineReducers} from 'redux';
import menuSlice from "./slices/menuSlice";
import cartSlices from "./slices/cartSlices";
import paymentSlice from "./slices/paymentSlice";
import dataSlices from "./slices/dataSlices";
import setCouponSlices from "./slices/setCouponSlices";
import notificationMenuSlices from "./slices/notificationMenuSlices";
import themeSwitchSlices from "./slices/themeSwitchSlices";
import popCardSlices from "./slices/popCardSlices";

const rootReducer = combineReducers({
    menuState: menuSlice,
    cartItems: cartSlices,
    paymentInfoState: paymentSlice,
    filterDataState: dataSlices,
    couponState: setCouponSlices,
    notificationState: notificationMenuSlices,
    themeSwitchSlices: themeSwitchSlices,
    popUpMenus: popCardSlices,
});

export default rootReducer;
