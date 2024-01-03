//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb24iOiJBT0xXaiIsInByb2plY3QiOiJwV05vZyIsInRva2VuIjoicDQ4TU0ifQ.3I505jFglnqH3r-obQ7Jum_-8SHitgWufKYk4jF6hwo

import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import ProductList from "./pages/List/ProductList";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import store, {persist} from './store/store';

import './index.css';
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import CouponPage from "./pages/CouponPage/CouponPage";

const App = lazy(() => import('./App'));
const Home = lazy(() => import('./pages/Home/Home'));
const List = lazy(() => import('./pages/List/List'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const Event = lazy(() => import('./pages/Event/Event'));

const appRoute = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<LoadingPage/>}><App/></Suspense>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "cart",
                element: <Cart/>,
            },
            {
                path: "payment",
                element: <Payment/>,
            },
            {
                path: "cart/coupon",
                element: <CouponPage/>,
            },
            {
                path: "menu",
                element: <Suspense fallback={<LoadingPage/>}><List/></Suspense>,
                children: [
                    {
                        path: "",
                        element: <ProductList type="all"/>,
                    },
                    {
                        path: ":type/:id",
                        element: <ProductList type="main"/>,
                    },
                    {
                        path: "offerProducts",
                        element: <ProductList type="offer"/>,
                    },
                    {
                        path: "search",
                        element: <ProductList type="search"/>,
                    },
                ]
            },
            {
                path: "/search",
                element: <SearchPage/>,

            },
            {
                path: "/event",
                element: <Event/>,

            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <RouterProvider router={appRoute}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
