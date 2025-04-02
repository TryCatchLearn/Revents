import { Attendee } from "../../../lib/types"
import { useAppSelector } from "../../../lib/stores/store";
import clsx from "clsx";
import AuthLink from "../../../app/router/AuthLink";

type Props = {
  attendees: Attendee[];
}

export default function EventAttendees({ attendees }: Props) {
  const followingIds = useAppSelector(state => state.follow.followingIds);

  return (
    <div className="avatar-group -space-x-5 hover:space-x-0">
      {attendees.map(attendee => (
        <AuthLink to={`/profiles/${attendee.id}`}
          className={clsx("avatar w-12 ml-1 cursor-pointer transition-all duration-300", {
            'border-2 border-secondary': followingIds.includes(attendee.id),
            'border-2 border-white': !followingIds.includes(attendee.id),
          })}
          key={attendee.id}
        >
          <img src={attendee.photoURL || '/user.png'} alt="attendee avatar" />
        </AuthLink>
      ))}
    </div>
  )
}