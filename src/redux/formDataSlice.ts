import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BasicDetails {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: 'solo' | 'couple' | 'family' | 'group';
  budget: string;
  isValid: boolean;
}
export interface InterestsVibes {
  // Add your interests properties
  adventure?: boolean;
  relaxation?: boolean;
  cultural?: boolean;
  nightlife?: boolean;
  // Add more as needed
}

export interface CultureHeritage {

}

export interface FormData {
    basicDetails: BasicDetails;
    interestsVibes: InterestsVibes;
    cultureHeritage: CultureHeritage;
}

export interface FormDataState {
  formData: FormData;
  loading: boolean;
  error: string | null;
}
// Initial state
const initialState: FormDataState = {
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
        updateBasicDetails: (state, action: PayloadAction<Partial<BasicDetails>>) => {
            state.formData.basicDetails = {
                ...state.formData.basicDetails,
                ...action.payload
            };
        },
        updateBudget: (state, action: PayloadAction<FormData>) => {
            state.formData = action.payload;
        },
        setInterestsVibes: (state, action: PayloadAction<FormData>) => {
            state.formData = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

// Expose actions
export const { updateBasicDetails, updateBudget, setInterestsVibes, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;