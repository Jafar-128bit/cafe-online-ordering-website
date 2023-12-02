import {createSlice} from '@reduxjs/toolkit';

const categoriesSlices = createSlice({
    name: 'categoriesTabState',
    initialState: {
        selectedCategory: 0,
    },
    reducers: {
        changeCategory: (state, action) => {
            const {selectedCategory} = action.payload;
            state.selectedCategory = selectedCategory;
        }
    }
});

export const {changeCategory} = categoriesSlices.actions;
export default categoriesSlices.reducer;