import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    formData: [],
    loading: false,
    error: null
};

// Create slices for redux
const userSlice = createSlice({
    name: 'stepperFormData',
    initialState,
    reducers: {
        setBasicDetails: (state, action) => {
            state.formData = action.payload;
            console.log('state.formData: ', state.formData);
        },
        setInterestsVibes: (state, action) => {
            state.formData = action.payload;
        },
        setCultureHeritage: (state, action) => {
            state.formData = action.payload;
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
export const { setFormData, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;