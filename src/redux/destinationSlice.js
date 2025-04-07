import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    cardDestinationsFromFb: [],
    loading: false,
    error: null
};

// Create slices for redux
const destinationSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {
        setCardDestinationsFromFb: (state, action) => {
            state.cardDestinationsFromFb = action.payload;
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
export const { setCardDestinationsFromFb, setLoading, setError } = destinationSlice.actions;

export default destinationSlice.reducer;