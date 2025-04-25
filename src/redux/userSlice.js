import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    userDetails: [],
    loading: false,
    error: null
};

// Create slices for redux
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

// Expose actions
export const { setUserDetails, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;