import { getFirestore } from "firebase-admin/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { AppEvent, Profile } from "./types";

const db = getFirestore();

export const updateProfileData = onDocumentUpdated('profiles/{docId}', async (event) => {
    logger.info('🎬 PROFILE UPDATED START');
    const before = event.data?.before.data() as Profile;
    const after = event.data?.after.data() as Profile;
    const profileId = event.params.docId;

    if (!before || !after) return;

    if (before.photoURL === after.photoURL) {
        logger.info('No photoURL change detected');
        return;
    }

    const events = await db.collection('events')
        .where('attendeeIds', 'array-contains', profileId).get();
    const followers = await db.collection(`profiles/${profileId}/followers`).get();
    const following = await db.collection(`profiles/${profileId}/following`).get();

    const newPhotoURL = after.photoURL;
    const batch = db.batch();

    // update attendees
    events.docs.forEach(doc => {
        const data = doc.data() as AppEvent;
        const updatedAttendees = data.attendees.map(a => {
            if (a.id === profileId) {
                return {
                    ...a,
                    photoURL: newPhotoURL
                }
            }
            return a;
        });

        batch.update(doc.ref, {attendees: updatedAttendees});
    });

    // update followers
    followers.docs.forEach(doc => {
        const otherUserId = doc.id;
        const ref = db.doc(`profiles/${otherUserId}/following/${profileId}`);
        batch.update(ref, {photoURL: newPhotoURL});
    });

    following.docs.forEach(doc => {
        const otherUserId = doc.id;
        const ref = db.doc(`profiles/${otherUserId}/followers/${profileId}`);
        batch.update(ref, {photoURL: newPhotoURL});
    });

    logger.info('Batch update started');

    return batch.commit();
})