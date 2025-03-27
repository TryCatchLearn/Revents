import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useAppSelector } from "../stores/store";
import { AppEvent } from "../types";
import { handleError } from "../util/util";
import { useFirestoreActions } from "./useFirestoreActions";

export const useEvent = (event: AppEvent) => {
    const {update} = useFirestoreActions({path: 'events'});
    const currentUser = useAppSelector(state => state.account.user);
    const host = event.attendees.find(x => x.id === event.hostUid);
    const isHost = currentUser?.uid === host?.id;
    const isGoing = event.attendees.some(x => x.id === currentUser?.uid);

    const now = new Date();
    const eventDate = new Date(event.date);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);

    const shouldShowCountdown = eventDate > now && eventDate < oneMonthFromNow;

    const handleAttendanceToggle = async () => {
        if (!currentUser) return;
        try {
            if (isGoing) {
                const attendee = event.attendees.find(x => x.id === currentUser.uid);
                await update(event.id, {
                    attendees: arrayRemove(attendee),
                    attendeeIds: arrayRemove(currentUser.uid)
                })
            } else {
                await update(event.id, {
                    attendees: arrayUnion({
                        id: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    }),
                    attendeeIds: arrayUnion(currentUser.uid)
                })
            }
        } catch (error) {
            handleError(error);
        }
    }

    const handleCancelToggle = async () => {
        try {
            await update(event.id, {
                isCancelled: !event.isCancelled
            })
        } catch (error) {
            handleError(error);
        }
    }

    return { 
        host, 
        isHost, 
        isGoing, 
        toggleAttendance: handleAttendanceToggle,
        cancelToggle: handleCancelToggle,
        shouldShowCountdown
    };
}