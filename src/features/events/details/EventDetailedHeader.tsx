import { Link } from "react-router";
import { AppEvent } from "../../../lib/types";

export default function EventDetailedHeader({event}: {event: AppEvent}) {
    const host = event.attendees.find(x => x.id === event.hostUid);

    return (
        <div className="card bg-base-100">
            <figure className="h-64 brightness-50 rounded-lg">
                <img
                    src={`/categoryImages/${event.category}.jpg`}
                    alt="event category image"
                    className="w-full object-cover"
                />
            </figure>

            <div className="card-body text-white justify-end absolute bottom-0 w-full">
                <div className="flex justify-between">
                    <div>
                        <h2 className="card-title text-4xl">{event.title}</h2>
                        <p>{event.date}</p>
                        <p>Hosted by {host?.displayName}</p>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="flex gap-3">
                            <Link to={`/manage/${event?.id}`} className="btn btn-secondary">
                                Manage event
                            </Link>
                            <button className="btn btn-primary">Join event</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}