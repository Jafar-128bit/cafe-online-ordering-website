import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persist} from './store/store';
import loadable from '@loadable/component';
import './index.css';
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import CategoriesTab from "./components/CategoriesTab/CategoriesTab";
import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "./data/data";
import ProductList from "./pages/List/ProductList";

const App = loadable(() => import('./App'));
const Home = loadable(() => import('./pages/Home/Home'));
const Cart = loadable(() => import('./pages/Cart/Cart'));
const List = loadable(() => import('./pages/List/List'));
const Payment = loadable(() => import('./pages/Payment/Payment'));
const SearchPage = loadable(() => import('./pages/SearchPage/SearchPage'));

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const renderProductCards = (category) => {
    const dataMap = {
        0: allItems,
        1: cake,
        2: cold,
        3: iceCream,
        4: noodles,
        5: chai,
        6: snacks,
        7: sandwich,
        8: smoothies,
    };
    return dataMap[category];
};

const appRoute = createBrowserRouter([
    {
        path: "/",
        element: (<App/>),
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
                path: "menu",
                element: <List/>,
                children: [
                    {
                        path: "",
                        element: <CategoriesTab/>
                    },
                    {
                        path: ":type/:id",
                        element: <ProductList type="main"/>,
                        loader: ({params}) => {
                            if (params.type === "normalMenu") return renderProductCards(params.id);
                            else if (params.type === "specialMenu") return [];
                        },
                    },
                    {
                        path: "offerProducts",
                        element: <ProductList type="offer"/>,
                    },
                ]
            },
            {
                path: "/search",
                element: <SearchPage/>,

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
