import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "../data/data";

import {setData} from "../store/slices/dataSlices";

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import debounce from 'lodash/debounce';

const searchData = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies];

const useSearchFilterOnChange = (delay = 0) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const productData = useSelector(state => state.filterDataState);

    const handleSetData = data => dispatch(setData(data));

    const debouncedHandleFilteredData = debounce(searchWord => {
            const newFilterData = searchData.filter(value =>
                value.productName.toLowerCase().includes(searchWord.toLowerCase())
            );
            searchWord === '' ? handleSetData([]) : handleSetData(newFilterData);
        }, delay);

    const handleFilteredData = event => {
        const searchWord = event.target.value;
        setInputValue(searchWord);
        debouncedHandleFilteredData(searchWord);
    };

    const handleDataClear = () => {
        handleSetData([]);
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
