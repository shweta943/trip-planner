import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetails {
    id: string;
    name: string;
    email: string;
    displayName?: string | null;
}

export interface UserState {
    userDetails: UserDetails[];
    loading: boolean;
    error: string | null;
}
// Initial state
const initialState: UserState = {
    userDetails: [],
    loading: false,
    error: null
};

// Create slices for redux
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetails[]>) => {
            state.userDetails = action.payload;
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
export const { setUserDetails, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;