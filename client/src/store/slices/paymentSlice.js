import {createSlice} from '@reduxjs/toolkit';

const paymentSlice = createSlice({
    name: "paymentProcessState",
    initialState: {
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        foodPack: false,
    },
    reducers: {
        paymentInfoState: (state, action) => {
            const {firstName, lastName, number, email, foodPack} = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.number = number;
            state.email = email;
            state.foodPack = foodPack;
        },
    }
});

export const {paymentInfoState} = paymentSlice.actions;
export default paymentSlice.reducer;