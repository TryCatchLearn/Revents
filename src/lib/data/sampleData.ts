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
    }
];