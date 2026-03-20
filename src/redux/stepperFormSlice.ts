import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* =======================
   TYPES
======================= */

export interface BasicDetails {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: "solo" | "couple" | "family" | "group";
  budget?: number; // optional until user sets it
}

export interface Preferences {
  interests: string[];
  vibe: string;
}

export interface StepperFormState {
  basicDetails: BasicDetails;
  preferences: Preferences;
}

/* =======================
   INITIAL STATE
======================= */

const initialState: StepperFormState = {
  basicDetails: {
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    tripType: "solo",
    budget: undefined
  },
  preferences: {
    interests: [],
    vibe: ""
  }
};

/* =======================
   SLICE
======================= */

const stepperFormSlice = createSlice({
  name: "stepperForm",
  initialState,
  reducers: {
    // Update basic details (partial update)
    updateBasicDetails: (
      state,
      action: PayloadAction<Partial<BasicDetails>>
    ) => {
      state.basicDetails = {
        ...state.basicDetails,
        ...action.payload
      };
    },

    // Update preferences (partial update)
    updatePreferences: (
      state,
      action: PayloadAction<Partial<Preferences>>
    ) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload
      };
    },

    // Reset entire form (use after submission)
    resetForm: () => initialState
  }
});

/* =======================
   EXPORTS
======================= */

export const {
  updateBasicDetails,
  updatePreferences,
  resetForm
} = stepperFormSlice.actions;

export default stepperFormSlice.reducer;