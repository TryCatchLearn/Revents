import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppEvent } from "../../lib/types"
import { events } from "../../lib/data/sampleData";

type State = {
    events: AppEvent[];
    selectedEvent: AppEvent | null;
    formOpen: boolean;
}

const initialState: State = {
    events: events,
    selectedEvent: null,
    formOpen: false,
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
        selectEvent: (state, action: PayloadAction<string | null>) => {
            state.selectedEvent = state.events.find(e => e.id === action.payload) || null;
        }
    }
});

export const { setEvents, createEvent, updateEvent, deleteEvent,
    selectEvent} = eventSlice.actions;