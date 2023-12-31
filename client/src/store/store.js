import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use 'redux-persist/lib/storage/session' for session storage
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['menuState', 'cartItems', 'paymentInfoState', 'themeSwitchSlices'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persist = persistStore(store);

export default store;