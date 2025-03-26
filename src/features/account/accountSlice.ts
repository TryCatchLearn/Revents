import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "../../lib/types"
import { User } from "firebase/auth";

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
        signIn: {
            reducer: (state, action: PayloadAction<AppUser>) => {
                state.user = action.payload;
            },
            prepare: (user: User) => {
                return {
                    payload: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        providerId: user.providerData[0].providerId
                    } as AppUser
                }
            }
        } ,
        signOut: (state) => {
            state.user = null;
        }
    }
});

export const { signIn, signOut } = accountSlice.actions;