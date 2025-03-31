import { AppEvent, AppUser } from "../types";

export const users: AppUser[] = [
    {
        uid: "bob-id",
        displayName: "Bob",
        email: "bob@test.com",
        photoURL: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        uid: "tom-id",
        displayName: "Tom",
        email: "tom@test.com",
        photoURL: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
        uid: "jane-id",
        displayName: "Jane",
        email: "jane@test.com",
        photoURL: 'https://randomuser.me/api/portraits/women/8.jpg'
    }
];

export const events: AppEvent[] = [
    {
        id: 'activity-p1',
        title: "Past Activity 1",
        date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
        description: "Activity 2 months ago",
        category: "drinks",
        city: "London",
        venue: "The Lamb and Flag, 33, Rose Street, Seven Dials, Covent Garden, London, Greater London, England, WC2E 9EB, United Kingdom",
        latitude: 51.51171665,
        longitude: -0.1256611057818921,
        hostUid: users[0].uid,
        attendees: [
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: true},
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[1].uid]
    },
    {
        id: 'activity-p2',
        title: "Past Activity 2",
        date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        description: "Activity 1 month ago",
        category: "culture",
        city: "Paris",
        venue: "Louvre Museum, Rue Saint-Honoré, Quartier du Palais Royal, 1st Arrondissement, Paris, Ile-de-France, Metropolitan France, 75001, France",
        latitude: 48.8611473,
        longitude: 2.33802768704666,
        hostUid: users[1].uid,
        attendees: [
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: true},
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: false},
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[1].uid, users[2].uid]
    },
    {
        id: 'activity-f1',
        title: "Future Activity 1",
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        description: "Activity 1 month in future",
        category: "culture",
        city: "London",
        venue: "Natural History Museum",
        latitude: 51.4965109,
        longitude: -0.17600190725447445,
        hostUid: users[2].uid,
        attendees: [{id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: true}],
        attendeeIds: [users[2].uid]
    },
    {
        id: 'activity-f2',
        title: "Future Activity 2",
        date: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(),
        description: "Activity 2 months in future",
        category: "music",
        city: "London",
        venue: "The O2",
        latitude: 51.502936649999995,
        longitude: 0.0032029278126681844,
        hostUid: users[1].uid,
        attendees: [
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: true},
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: false}
        ],
        attendeeIds: [users[1].uid, users[2].uid]
    },
    {
        id: 'activity-f3',
        title: "Future Activity 3",
        date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
        description: "Activity 3 months in future",
        category: "drinks",
        city: "London",
        venue: "The Mayflower",
        latitude: 51.501778,
        longitude: -0.053577,
        hostUid: users[1].uid,
        attendees: [{id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: true}],
        attendeeIds: [users[1].uid]
    },
    {
        id: 'activity-f4',
        title: "Future Activity 4",
        date: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString(),
        description: "Activity 4 months in future",
        category: "drinks",
        city: "London",
        venue: "The Blackfriar",
        latitude: 51.51214665,
        longitude: -0.10364680647106028,
        hostUid: users[2].uid,
        attendees: [
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: true},
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[2].uid]
    },
    {
        id: 'activity-f5',
        title: "Future Activity 5",
        date: new Date(new Date().setMonth(new Date().getMonth() + 5)).toISOString(),
        description: "Activity 5 months in future",
        category: "culture",
        city: "New York",
        venue: "Metropolitan Museum of Art",
        latitude: 40.779437,
        longitude: -73.963244,
        hostUid: users[0].uid,
        attendees: [
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: true},
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[1].uid]
    },
    {
        id: 'activity-f6',
        title: "Future Activity 6",
        date: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
        description: "Activity 6 months in future",
        category: "music",
        city: "Tokyo",
        venue: "Tokyo Dome",
        latitude: 35.705639,
        longitude: 139.751891,
        hostUid: users[2].uid,
        attendees: [
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: true},
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: false}
        ],
        attendeeIds: [users[2].uid, users[0].uid]
    },
    {
        id: 'activity-f7',
        title: "Future Activity 7",
        date: new Date(new Date().setMonth(new Date().getMonth() + 7)).toISOString(),
        description: "Activity 7 months in future",
        category: "drinks",
        city: "Sydney",
        venue: "Opera Bar",
        latitude: -33.8567844,
        longitude: 151.2152967,
        hostUid: users[1].uid,
        attendees: [
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: true},
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: false}
        ],
        attendeeIds: [users[1].uid, users[2].uid]
    },
    {
        id: 'activity-f8',
        title: "Future Activity 8",
        date: new Date(new Date().setMonth(new Date().getMonth() + 8)).toISOString(),
        description: "Activity 8 months in future",
        category: "culture",
        city: "Rome",
        venue: "Colosseum",
        latitude: 41.890251,
        longitude: 12.492373,
        hostUid: users[0].uid,
        attendees: [
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: true},
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[1].uid]
    },
    {
        id: 'activity-f9',
        title: "Future Activity 9",
        date: new Date(new Date().setMonth(new Date().getMonth() + 9)).toISOString(),
        description: "Activity 9 months in future",
        category: "music",
        city: "Berlin",
        venue: "Berghain",
        latitude: 52.511244,
        longitude: 13.444297,
        hostUid: users[2].uid,
        attendees: [
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: true},
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: false}
        ],
        attendeeIds: [users[2].uid, users[0].uid]
    },
    {
        id: 'activity-f10',
        title: "Future Activity 10",
        date: new Date(new Date().setMonth(new Date().getMonth() + 10)).toISOString(),
        description: "Activity 10 months in future",
        category: "drinks",
        city: "Cape Town",
        venue: "The Gin Bar",
        latitude: -33.925839,
        longitude: 18.42322,
        hostUid: users[1].uid,
        attendees: [
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: true},
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: false}
        ],
        attendeeIds: [users[1].uid, users[2].uid]
    },
    {
        id: 'activity-f11',
        title: "Future Activity 11",
        date: new Date(new Date().setMonth(new Date().getMonth() + 11)).toISOString(),
        description: "Activity 11 months in future",
        category: "culture",
        city: "Beijing",
        venue: "Forbidden City",
        latitude: 39.9163447,
        longitude: 116.3971546,
        hostUid: users[0].uid,
        attendees: [
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: true},
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[1].uid]
    },
    {
        id: 'activity-f12',
        title: "Future Activity 12",
        date: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString(),
        description: "Activity 12 months in future",
        category: "music",
        city: "Rio de Janeiro",
        venue: "Maracanã Stadium",
        latitude: -22.91216,
        longitude: -43.230182,
        hostUid: users[2].uid,
        attendees: [
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: true},
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: false}
        ],
        attendeeIds: [users[2].uid, users[0].uid]
    },
    {
        id: 'activity-f13',
        title: "Future Activity 13",
        date: new Date(new Date().setMonth(new Date().getMonth() + 13)).toISOString(),
        description: "Activity 13 months in future",
        category: "drinks",
        city: "Bangkok",
        venue: "Sky Bar",
        latitude: 13.723419,
        longitude: 100.5331,
        hostUid: users[1].uid,
        attendees: [
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: true},
            {id: users[2].uid, displayName: users[2].displayName, photoURL: users[2].photoURL, isHost: false}
        ],
        attendeeIds: [users[1].uid, users[2].uid]
    },
    {
        id: 'activity-f14',
        title: "Future Activity 14",
        date: new Date(new Date().setMonth(new Date().getMonth() + 14)).toISOString(),
        description: "Activity 14 months in future",
        category: "culture",
        city: "Moscow",
        venue: "Red Square",
        latitude: 55.753913,
        longitude: 37.620836,
        hostUid: users[0].uid,
        attendees: [
            {id: users[0].uid, displayName: users[0].displayName, photoURL: users[0].photoURL, isHost: true},
            {id: users[1].uid, displayName: users[1].displayName, photoURL: users[1].photoURL, isHost: false}
        ],
        attendeeIds: [users[0].uid, users[1].uid]
    }
];