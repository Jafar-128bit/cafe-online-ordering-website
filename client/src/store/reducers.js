import {combineReducers} from 'redux';
import menuSlice from "./slices/menuSlice";
import cartSlices from "./slices/cartSlices";
import paymentSlice from "./slices/paymentSlice";
import dataSlices from "./slices/dataSlices";
import setCouponSlices from "./slices/setCouponSlices";
import specialMenuSlices from './slices/specialMenuSlices';
import notificationMenuSlices from "./slices/notificationMenuSlices";

const rootReducer = combineReducers({
    menuState: menuSlice,
    cartItems: cartSlices,
    paymentInfoState: paymentSlice,
    filterDataState: dataSlices,
    couponState: setCouponSlices,
    specialMenuState: specialMenuSlices,
    notificationState: notificationMenuSlices,
});

export default rootReducer;
