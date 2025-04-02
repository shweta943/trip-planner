import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    destinations: [],
    loading: false,
    error: null
};

// Create slice
const destinationSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {
        setDestinations: (state, action) => {
            state.destinations = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setDestinations, setLoading, setError } = destinationSlice.actions;

export default destinationSlice;