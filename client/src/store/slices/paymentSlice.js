import {createSlice} from '@reduxjs/toolkit';

const paymentSlice = createSlice({
    name: "paymentProcessState",
    initialState: {
        signInState: false,
        userName: "",
        contactNumber: "",
    },
    reducers: {
        checkSignInState: (state, action) => {
            const {signInState} = action.payload;
            state.signInState = signInState;
        },
        paymentInfoState: (state, action) => {
            const {userName, contactNumber} = action.payload;
            state.userName = userName;
            state.contactNumber = contactNumber;
        },
    }
});

export const {checkSignInState, paymentInfoState} = paymentSlice.actions;
export default paymentSlice.reducer;