import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from '../../features/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { eventSlice } from '../../features/events/eventSlice'
import { accountSlice } from '../../features/account/accountSlice'
import { firestoreSlice } from '../firebase/firestoreSlice'
import { followSlice } from '../../features/profiles/followSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    event: eventSlice.reducer,
    account: accountSlice.reducer,
    firestore: firestoreSlice.reducer,
    follow: followSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()