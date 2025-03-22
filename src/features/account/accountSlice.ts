import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "../../lib/types"

type State = {
    user: AppUser | null;
}

const initialState: State = {
    user: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<AppUser>) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
        }
    }
});

export const { signIn, signOut } = accountSlice.actions;