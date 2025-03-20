import { useAppDispatch } from "../../../lib/stores/store";
import { AppEvent } from "../../../lib/types";
import { deleteEvent, toggleForm } from "../eventSlice";
import EventAttendees from "./EventAttendees";

type Props = {
    event: AppEvent;
}

export default function EventCard({ event }: Props) {
    const host = event.attendees.find(x => x.id === event.hostUid);
    const dispatch = useAppDispatch();

    return (
        <div className="card card-border bg-base-100 w-full">
            <div className="card-body">
                <div className="flex gap-3 items-center">
                    <figure className="card-figure w-14 rounded-lg">
                        <img
                            src={host?.photoURL || '/user.png'}
                            alt="user avatar" />
                    </figure>
                    <div>
                        <h2 className="card-title">{event.title}</h2>
                        <p className="text-sm text-neutral">Hosted by {host?.displayName}</p>
                    </div>
                </div>

                <div className="bg-base-200 -mx-6 my-3 px-4 py-2 border-y border-neutral/20">
                    <EventAttendees attendees={event.attendees} />
                </div>

                <div className="card-actions flex">
                    <div className="flex flex-1">
                        {event.description}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => dispatch(deleteEvent(event.id))} className="btn btn-error">Delete</button>
                        <button onClick={() => dispatch(toggleForm(event))} className="btn btn-primary">View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}