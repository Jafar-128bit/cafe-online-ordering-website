import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "../data/data";

import {setData} from "../store/slices/dataSlices";

import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const searchData = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies];

const useSearchFilterOnClick = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const productData = useSelector(state => state.filterDataState);

    const handleSetData = data => dispatch(setData(data));

    const handleFilteredData = useCallback(
        searchWord => {
            const newFilterData = searchData.filter(value =>
                value.productName.toLowerCase().includes(searchWord.toLowerCase())
            );
            searchWord === '' ? handleSetData([]) : handleSetData(newFilterData);
        },
        [handleSetData]
    );

    const handleSearch = () => {
        handleFilteredData(inputValue);
    };

    const handleDataClear = () => {
        handleSetData([]);
        setInputValue('');
    };

    return {
        inputValue,
        productData,
        setInputValue,
        handleSearch,
        handleDataClear,
    };
};

export default useSearchFilterOnClick;
