import { Link } from "react-router";
import { useFollowings } from "../../../lib/hooks/useFollowing";
import { AppEvent } from "../../../lib/types";

export default function EventDetailedSidebar({ event }: { event: AppEvent }) {
    const { followingIds } = useFollowings();

    return (
        <div className="card bg-base-100">
            <div className="card-title bg-grad-primary">
                {event?.attendees.length} People going
            </div>
            <div className="card-body">
                <div className="flex flex-col gap-3">

                    {event?.attendees.map((attendee, index) => (
                        <Link to={`/profiles/${attendee.id}`} key={attendee.id}>
                            <div className="flex gap-3 align-middle justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <div className="avatar">
                                        <div className="w-16 rounded">
                                            <img src={attendee?.photoURL || '/user.png'} alt="user avatar" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-2xl">{attendee.displayName}</span>
                                        {followingIds.includes(attendee.id) && (
                                            <span className="badge badge-primary badge-soft">
                                                Following
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {event.hostUid === attendee.id &&
                                    <div className="badge badge-info">Host</div>}

                            </div>
                            {index < event.attendees.length - 1 && (
                                <div className="divider mb-0"></div>
                            )}
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    )
}