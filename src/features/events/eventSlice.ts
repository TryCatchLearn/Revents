import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppEvent } from "../../lib/types"
import { AppDispatch, RootState } from "../../lib/stores/store";

type State = {
    events: AppEvent[];
    selectedEvent: AppEvent | null;
    formOpen: boolean;
}

const initialState: State = {
    events: [],
    selectedEvent: null,
    formOpen: false,
}

export function toggleForm(event: AppEvent | null) {
    return function (dispatch: AppDispatch, getState: () => RootState) {
        const formOpen = getState().event.formOpen;
        if (formOpen) {
            dispatch(closeForm());
            setTimeout(() => {
                dispatch(selectEvent(event));
                dispatch(openForm());
            }, 300);
        } else {
            dispatch(selectEvent(event));
            dispatch(openForm());
        }
    }
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<AppEvent[]>) => {
            state.events = action.payload;
        },
        createEvent: (state, action: PayloadAction<AppEvent>) => {
            state.events.push(action.payload);
        },
        updateEvent: (state, action: PayloadAction<AppEvent>) => {
            state.events = state.events.map(e => e.id === action.payload.id ? action.payload : e);
        },
        deleteEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(e => e.id !== action.payload);
        },
        selectEvent: (state, action: PayloadAction<AppEvent | null>) => {
            state.selectedEvent = action.payload;
        },
        openForm: (state) => {
            state.formOpen = true;
        },
        closeForm: (state) => {
            state.formOpen = false;
        }
    }
});

export const { setEvents, createEvent, updateEvent, deleteEvent,
    selectEvent, openForm, closeForm } = eventSlice.actions;