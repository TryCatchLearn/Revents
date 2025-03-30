import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FollowState = {
    followingIds: string[];
}

const initialState: FollowState = {
    followingIds: [],
}

export const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
        setFollowings: (state, action: PayloadAction<string[]>) => {
            state.followingIds = action.payload;
        },
        addFollowing: (state, action: PayloadAction<string>) => {
            const set = new Set(state.followingIds);
            set.add(action.payload);
            state.followingIds = Array.from(set);
        },
        removeFollowing: (state, action: PayloadAction<string>) => {
            const set = new Set(state.followingIds);
            set.delete(action.payload);
            state.followingIds = Array.from(set);
        } 
    }
});

export const {addFollowing, removeFollowing, setFollowings} = followSlice.actions;