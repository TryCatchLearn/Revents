import { Timestamp } from "firebase/firestore";

export type AppUser = {
    uid: string;
    displayName: string;
    photoURL?: string;
    email: string;
}

export type AppEvent = {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
    latitude: number;
    longitude: number;
    hostUid: string;
    attendees: Attendee[];
    attendeeIds: string[];
}

export type FirestoreAppEvent = Omit<AppEvent, 'date'> & {
    date: Timestamp
}

export type Attendee = {
    id: string;
    displayName: string;
    photoURL?: string;
    isHost: boolean;
}

export type Suggestion = {
    place_id: string
    osm_id: string
    osm_type: string
    licence: string
    lat: string
    lon: string
    boundingbox: string[]
    class: string
    type: string
    display_name: string
    display_place: string
    display_address: string
    address: Address
}

export type Address = {
    name: string
    road: string
    suburb: string
    city: string
    county: string
    state: string
    postcode: string
    country: string
    country_code: string
}
