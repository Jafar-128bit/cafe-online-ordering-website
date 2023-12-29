import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "../data/data";

import {setData, clearData} from "../store/slices/dataSlices";

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import debounce from 'lodash/debounce';

const searchData = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies];

const useSearchFilterOnChange = (delay = 0) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const productData = useSelector(state => state.filterDataState);

    const debouncedHandleFilteredData = debounce(searchWord => {
            const newFilterData = searchData.filter(value =>
                value.productName.toLowerCase().includes(searchWord.toLowerCase())
            );
            searchWord === '' ? dispatch(clearData()) : dispatch(setData(newFilterData));
        }, delay);

    const handleFilteredData = event => {
        const searchWord = event.target.value;
        setInputValue(searchWord);
        debouncedHandleFilteredData(searchWord);
    };

    const handleDataClear = () => {
        dispatch(clearData());
        setInputValue('');
    };

    return {
        inputValue,
        productData,
        handleFilteredData,
        handleDataClear,
    };
};

export default useSearchFilterOnChange;
