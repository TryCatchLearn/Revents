import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as logger from "firebase-functions/logger";
import { AppEvent, Attendee, Status } from './types';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();

export const updateNews = onDocumentWritten('events/{docId}', async (fbEvent) => {
    logger.info('🎬 EVENT WRITTEN START');
    const before = fbEvent.data?.before.data() as AppEvent;
    const after = fbEvent.data?.after.data() as AppEvent;
    const eventId = fbEvent.params.docId;

    let status: Status;
    let attendee = {} as Attendee;

    if (before && before.attendees.length < after.attendees.length) {
        attendee = after.attendees.find(a => !before.attendees.some(b => b.id === a.id)) as Attendee;
        status = 'added';
        logger.info('Attendee added', {eventId, attendee, status});
    }

    if (before && before.attendees.length > after.attendees.length) {
        attendee = before.attendees.find(a => !after.attendees.some(b => b.id === a.id)) as Attendee;
        status = 'removed';
        logger.info('Attendee removed', {eventId, attendee, status});
    }

    if (!before) {
        attendee = after.attendees[0];
        status = 'created';
        logger.info('New event created', {eventId, attendee, status});
    }

    if (attendee) {
        try {
            const followDocs = await db.collection(`profiles/${attendee.id}/followers`).get();
            followDocs.docs.forEach(async (doc) => {
                await db.doc(`profiles/${doc.id}/newsfeed/${eventId}-${fbEvent.time}`).set({
                    photoURL: attendee.photoURL,
                    displayName: attendee.displayName,
                    eventId: eventId,
                    title: after.title,
                    userUid: attendee.id,
                    status,
                    created: Timestamp.now()
                })
            })
        } catch (error) {
            logger.error('Error writing news', {error});
        }
    }

    return logger.log('🏁 EVENT WRITTEN END ' + eventId);
})