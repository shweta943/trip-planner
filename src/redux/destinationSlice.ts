import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardDestination {
    id?: string;
    title: string;
    details: string;
    bestTimeToVisit: string;
    image: { url: string; alt?: string }[];
    highlights?: string[];
}

export interface DestinationState {
    cardDestinationsFromFb: CardDestination[];
    loading: boolean;
    error: string | null;
}
// Initial state
const initialState: DestinationState = {
    cardDestinationsFromFb: [],
    loading: false,
    error: null
};

// Create slices for redux
const destinationSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {
        setCardDestinationsFromFb: (state, action: PayloadAction<CardDestination[]>) => {
            state.cardDestinationsFromFb = action.payload;
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
export const { setCardDestinationsFromFb, setLoading, setError } = destinationSlice.actions;

export default destinationSlice.reducer;