import { Attendee } from "../../../lib/types"
import { useAppSelector } from "../../../lib/stores/store";
import clsx from "clsx";
import AuthLink from "../../../app/router/AuthLink";

type Props = {
  attendees: Attendee[];
}

function AttendeeAvatar({ attendee, isFollowing }: { attendee: Attendee; isFollowing: boolean }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/user.png';
  };

  return (
    <AuthLink to={`/profiles/${attendee.id}`}
      className={clsx("avatar w-12 ml-1 cursor-pointer transition-all duration-300", {
        'border-2 border-secondary': isFollowing,
        'border-2 border-white': !isFollowing,
      })}
    >
      <img
        className="aspect-square object-cover"
        src={attendee.photoURL || '/user.png'}
        alt="attendee avatar"
        onError={handleError}
      />
    </AuthLink>
  );
}

export default function EventAttendees({ attendees }: Props) {
  const followingIds = useAppSelector(state => state.follow.followingIds);

  return (
    <div className="avatar-group -space-x-5 hover:space-x-0">
      {attendees.map(attendee => (
        <AttendeeAvatar
          key={attendee.id}
          attendee={attendee}
          isFollowing={followingIds.includes(attendee.id)}
        />
      ))}
    </div>
  )
}