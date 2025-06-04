import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    formData: {
        basicDetails: {
            destination: '',
            startDate: '',
            endDate: '',
            travelers: 1,
            tripType: 'solo',
            budget: '',
            isValid: false
        },
        interestsVibes: {},
        cultureHeritage: {},
    },
    loading: false,
    error: null
};

// Create slices for redux
const userSlice = createSlice({
    name: 'stepperFormData',
    initialState,
    reducers: {
        updateBasicDetails: (state, action) => {
            state.formData.basicDetails = {
                ...state.formData.basicDetails,
                ...action.payload
            };
        },
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
});

// Expose actions
export const { updateBasicDetails, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;